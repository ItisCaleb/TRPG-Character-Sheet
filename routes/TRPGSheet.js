const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Session = require('../model/Session');
const Sheet = require('../model/SheetInfo');
const Image = require('../model/Avatar')
//import sheet schema
const {CharacterSheet,getSystem} = require("../model/CharacterSheet")


function getToken(token){
    if(token){
        try{
            jwt.verify(token, process.env.JWT_SECRET);
        }catch (e){
            throw new Error("Verify fail")
        }
    }
    return jwt.decode(token)
}

router.get('/getSheets', verify, async function (req, res) {
    const id = req.token._id;
    const sheets = await Sheet.find({author: {$in: [id]}});
    const sheet = [];
    for (let i=0;i<sheets.length;i++){
        sheet.push({
            name: sheets[i].name,
            system: sheets[i].system,
            player: sheets[i].player_name,
            url: sheets[i]._id
        })
    }
    res.status(200).send(sheet)

});
router.get('/checkAccess/:id', async function (req, res) {
    try{
        const user = getToken(req.cookies['auth_token'])
        const sheet = await new CharacterSheet().init(req.params.id,user)
        if(sheet.checkOwn()) res.send("author")
        else if(await sheet.checkView()) res.send("view")
        else res.send("noPerm")
    }catch (err){
        if(err.message==="Verify fail")res.status(401).send("哈哈")
        else res.status(404).send("沒有這張角色卡")
    }
})

router.get('/getSheetData/:id', async function (req, res) {
    let sheetId = req.params.id
    try{
        const user = getToken(req.cookies['auth_token'])
        let model = await new CharacterSheet().init(sheetId,user)
        let sheet = await model.exec()
        res.send(sheet)
    }catch (err){
        if(err.message==="Verify fail")res.status(401).send("哈哈")
        else res.status(404).send("沒有這張角色卡")
    }
})
router.post('/getSheetData/:id',async function(req,res){
    let sheetId = req.params.id
    try{
        const fields = (Array.isArray(req.body))?req.body:[]
        const user = getToken(req.cookies['auth_token'])
        let model = await new CharacterSheet().init(sheetId,user)
        let sheet = await model.exec(...fields)
        res.send(sheet)
    }catch (err){
        if(err.message==="Verify fail")res.status(401).send("哈哈")
        else res.status(404).send("沒有這張角色卡")
    }
})

router.post('/createSheet/:system',verify,async function(req,res){
    const creator = req.token;
    const user = await User.findById({_id: creator._id});
    if (user.sheet_number >= 50) return res.status(400).send('角色卡已達上限');
    try {
        const sheet = await new CharacterSheet().init()
        const id = await sheet.create(req.body.name,creator.name,req.params.system,creator._id)
        await User.updateOne({_id: creator._id}, {$inc: {sheet_number: 1}});
        res.send(id);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

router.post('/editSheet/:id', verify, async function (req, res) {
    const cs = req.body;
    const sheetId = req.params.id;
    const user = req.token;
    try {
        const sheet = await new CharacterSheet().init(sheetId,user)
        sheet.update(cs.info, cs)
        await sheet.exec()
        res.send('success');
    } catch (err) {
        console.log(err);
        res.status(403).send('沒有權限')
    }
});


router.delete('/deleteSheet/:id', verify, async function (req, res) {
    const sheetId = req.params.id;
    const user = req.token;
    try {
        const sheet = await new CharacterSheet().init(req.params.id,user)
        await sheet.delete().exec()
        await Image.deleteOne({_id: sheetId})
        await User.updateOne({_id:user._id}, {$inc: {sheet_number: -1}})
        let query = `sheet.${user.name}`
        await Session.updateMany({player: user.name}, {$pull:{[query]:sheetId}})
        res.send('已刪除角色卡')
    } catch (err) {
        console.log(err);
        res.status(403).send('沒有權限')
    }
})

module.exports = router;

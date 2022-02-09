const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Info = require('../model/SheetInfo');
const Session = require('../model/Session');
const Sheet = require('../model/SheetInfo');
const Image = require('../model/Avatar')
//import sheet schema
const CharacterSheet = require("../model/CharacterSheet")
const DND5e = require('../model/DND5e/DND5e')
const COC7th = require('../model/COC7th/COC7th')
const COC6th = require('../model/COC6th/COC6th')

const systems = {
    COC7th:{
        class: ()=>{return new COC7th()},
        props: ["stat","story","equip","skill"]
    },
    COC6th:{
        class: ()=>{return new COC6th()},
        props: ["stat","story","equip","skill"]
    },
    DND5e:{
        class: ()=>{return new DND5e()},
        props: ["stat","story","equip","spell"]
    }
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
    if(req.cookies['auth_token']){
        try {
            jwt.verify(req.cookies['auth_token'], process.env.JWT_SECRET);
        }catch (err){
            res.status(401).send('哈哈')
        }
    }
    const user = jwt.decode(req.cookies['auth_token'])
    const sheet = await new CharacterSheet({}).init(req.params.id,user)
    if(sheet.checkOwn()) res.send("author")
    else if(await sheet.checkView()) res.send("view")
    else res.send("noPerm")
})

router.get('/getSheetData/:system/:id', async function (req, res) {
    let sheetId = req.params.id
    if(req.cookies['auth_token']){
        try {
            jwt.verify(req.cookies['auth_token'], process.env.JWT_SECRET);
        }catch (err){
            return  res.status(401).send('哈哈')
        }
    }
    const user = jwt.decode(req.cookies['auth_token'])
    try{
        let model = await systems[req.params.system].class().init(sheetId,user)
        let sheet = await model.exec()
        res.send(sheet)
    }catch (err){
        console.log(err)
        res.status(404).send("沒有這張角色卡")
    }
})

router.post('/createSheet/:system',verify,async function(req,res){
    const creator = req.token;
    const user = await User.findById({_id: creator._id});
    if (user.sheet_number >= 50) return res.status(400).send('角色卡已達上限');
    try {
        const id = await (await systems[req.params.system].class().init()).create(req.body.name,creator.name,creator._id)
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
    const info = await Info.findOne({_id: sheetId,author:user._id});
    if(!info) return res.status(400).send("沒有權限")
    try {
        const sheet = await systems[info.system].class().init(sheetId,user)
        const newSheet = {}
        let props = systems[info.system].props
        for (let i=0;i<systems[info.system].props.length;i++){
            newSheet[props[i]] = cs[props[i]]
        }
        sheet.update(cs.info.name, cs.info.player_name, cs.info.permission, newSheet)
        await sheet.exec()
        res.send('success');
    } catch (err) {
        console.log(err);
        //return res.status(403).send('這不是你的角色卡!')
        res.status(400).send(err);
    }
});


router.delete('/deleteSheet/:id', verify, async function (req, res) {
    const sheetId = req.params.id;
    const user = req.token;
    const info = await Info.findOne({_id: sheetId,author:user._id});
    if(!info) return res.status(400).send("沒有權限")
    try {
        await (await systems[info.system].class().init(req.params.id,req.token)).delete().exec()
        await Image.deleteOne({_id: sheetId})
        await User.updateOne({_id:user._id}, {$inc: {sheet_number: -1}})
        let query = `sheet.${user.name}`
        await Session.updateMany({player: user.name}, {$pull:{[query]:sheetId}})
        res.send('已刪除角色卡')
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router;

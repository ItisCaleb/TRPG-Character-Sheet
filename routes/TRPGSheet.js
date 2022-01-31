const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Info = require('../model/SheetInfo');
const Session = require('../model/Session');
const Sheet = require('../model/SheetInfo');
const Image = require('../model/Avatar')
//import sheet schema
const DND5e = require('../model/DND5e/DND5e')
const COC7th = require('../model/COC7th/COC7th')
const COC6th = require('../model/COC6th/COC6th')

const mongoose = require('mongoose')


router.get('/getSheets', verify, async function (req, res) {
    const id = req.token._id;
    const SheetFind = await Sheet.findOne({author: id});
    const cursor = await Sheet.find({author: {$in: [id]}});
    if (!SheetFind) {
        res.send('NotFound')
    } else {
        const sheet = [];
        cursor.forEach(function (Sheet) {
            sheet.push({
                name: Sheet.name,
                system: Sheet.system,
                player: Sheet.player_name,
                url: Sheet._id
            })
        });
        res.status(200).send(sheet)
    }

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
    const sheet = await Info.findById({_id: req.params.id})
    let perm
    if(sheet != null){
        if (user && user._id === sheet.author.toString()) perm='author'
        else if (sheet.permission === '所有人' || user.admin) perm='view'
        else if (sheet.session.length === 0) {
            return res.send('noPerm')
        }
        else {
            if (!user) return res.sendStatus(401)
            sheet.session=sheet.session.map(id=>mongoose.Types.ObjectId(id))
            const sessions = await Session.findById({_id:{$in:sheet.session}})
            for (let session in sessions) {
                switch (sheet.permission) {
                    case "限團務GM": {
                        if (user.name === session.gm) perm='view'
                        break;
                    }
                    case "團務所有人": {
                        if (session.player.includes(user.name)) perm='view'
                        break;
                    }
                }
                if(perm) break
            }
            return res.send('noPerm')
        }
        res.send(perm)
    }else res.send("noPerm")

})

router.get('/getSheetData/:system/:id', async function (req, res) {
    let sheetId = req.params.id
    let sheet
    try{
        switch (req.params.system) {
            case "COC7th":
                sheet = await new COC7th(sheetId).exec()
                break
            case "DND5e":
                sheet = await new DND5e(sheetId).exec()
                break
            case "COC6th":
                sheet = await new COC6th(sheetId).exec()
                break
        }
        res.send(sheet)
    }catch (err){
        res.status(404).send("沒有這張角色卡")
    }
})


router.delete('/delete/:id', verify, async function (req, res) {
    const sheetId = req.params.id;
    const userID = req.token._id;
    const info = await Info.findOne({_id: sheetId,author:userID});
    if (info) {
        try {
            switch (info.system) {
                case "COC7th":
                    await new COC7th(sheetId).delete().exec()
                    break
                case "DND5e":
                    await new DND5e(sheetId).delete().exec()
                    break
                case "COC6th":
                    await new COC6th(sheetId).delete().exec()
                    break
            }
            await Image.deleteOne({_id: sheetId, type: info.system})
            const user = await User.findByIdAndUpdate(userID, {$inc: {sheet_number: -1}})
            let query = `sheet.${user.name}`
            await Session.updateMany({player: user.name}, {$pull:{[query]:sheetId}})
            res.send('已刪除角色卡')
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    } else return res.status(403).send('你並無權限修改此角色卡')
})

module.exports = router;

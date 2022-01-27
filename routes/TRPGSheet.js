const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Info = require('../model/SheetInfo');
const Session = require('../model/Session');
const Sheet = require('../model/SheetInfo');
const Image = require('../model/Avatar')
const getTRPGSheet = require('../utils/findSheets')
//import sheet schema
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');
const COC6thStat = require('../model/COC6th/Stat');
const COC6thStory = require('../model/COC6th/Story');
const COC6thEquip = require('../model/COC6th/Equip');
const COC6thSkill = require('../model/COC6th/Skill');
const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');
const mongoose = require('mongoose')


router.get('/getSheets', verify, async function (req, res) {
    const id = jwt.decode(req.cookies['auth_token'])._id;
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
    const user = jwt.decode(req.cookies['auth_token'])
    const sheet = await Info.findById({_id: req.params.id})
    let perm
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
})

router.get('/getSheetData/:system/:id', function (req, res) {
    getTRPGSheet(req)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})


router.delete('/delete/:id', verify, async function (req, res) {
    const sheetId = req.params.id;
    const user = jwt.decode(req.cookies['auth_token'])._id;
    const info = await Info.findOne({_id: sheetId,author:user});
    if (info) {
        try {
            switch (info.system) {
                case "COC7th":
                    await COC7thStat.deleteOne({_id: sheetId});
                    await COC7thStory.deleteOne({_id: sheetId});
                    await COC7thSkill.deleteOne({_id: sheetId});
                    await COC7thEquip.deleteOne({_id: sheetId});
                    break;
                case "DND5e":
                    await DND5eStat.deleteOne({_id: sheetId});
                    await DND5eStory.deleteOne({_id: sheetId});
                    await DND5eSpell.deleteOne({_id: sheetId});
                    await DND5eEquip.deleteOne({_id: sheetId});
                    break;
                case "COC6th":
                    await COC6thStat.deleteOne({_id: sheetId});
                    await COC6thStory.deleteOne({_id: sheetId});
                    await COC6thSkill.deleteOne({_id: sheetId});
                    await COC6thEquip.deleteOne({_id: sheetId})
            }
            await Image.deleteOne({_id: sheetId, type: info.system})
            await Info.deleteOne({_id: sheetId});
            await User.updateOne({_id: user}, {$inc: {sheet_number: -1}})
            await Session.updateMany({sheet: req.params.id}, {$pull: {sheet: req.params.id}})
            res.send('已刪除角色卡')
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    } else return res.status(403).send('你並無權限修改此角色卡')
})

module.exports = router;

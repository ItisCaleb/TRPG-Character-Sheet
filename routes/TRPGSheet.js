const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('./module/verifyToken');
const User = require('../model/User');
const Info = require('../model/Info');
const Session = require('../model/Session');
const Sheet = require('../model/Info');
const Image = require('../model/Avatar')
const getTRPGSheet = require('./module/sheetJSON')
//import sheet schema
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');
const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');

router.get('/getSheets', async function (req, res) {
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
router.get('/getSheetData/:id', function (req, res) {
    const id = req.params.id
    const user = jwt.decode(req.cookies['auth_token'])
    try {
        getTRPGSheet(id, user._id)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    } catch (err) {
        res.status(400).send(err)
    }


})


router.delete('/delete/:id', verify, async function (req, res) {
    const sheetId = req.params.id;
    const user = jwt.decode(req.cookies['auth_token'])._id;
    const info = await Info.findOne({_id: sheetId});
    if (info.author === user) {
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
        }
        await Image.deleteOne({_id: sheetId, type: info.system})
        await Info.deleteOne({_id: sheetId});
        await User.updateOne({_id: user}, {$inc: {sheet_number: -1}})

        const session = await Session.find({sheet: sheetId})
        for (const sheet of session) {
            await Session.updateOne({sheet: req.params.id}, {$pull: {sheet: sheetId}})
        }
        res.send('已刪除角色卡')

    } else return res.status(403).send('你並無權限修改此角色卡')
})

module.exports = router;

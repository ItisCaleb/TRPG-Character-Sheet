const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Info = require('../model/SheetInfo');
const Roll20Translate = require('../utils/converter/Roll20COC7thMap')
//import sheet schema
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');
const Avatar = require('../model/Avatar');


router.get('/COC7th/create/:name', verify, async function (req, res) {
    const creator = jwt.decode(req.cookies['auth_token']);
    const user = await User.findOne({_id: creator._id});
    if (user.sheet_number >= 20) return res.status(400).send('角色卡已達上限');
    //save new sheet
    const sheet = new Info({
        name: req.params.name,
        player_name: creator.name,
        system: "COC7th",
        author: creator._id
    });
    //save skill
    const skill = new COC7thSkill({
        _id: sheet._id,
    });
    const stat = new COC7thStat({
        _id: sheet._id,
    });
    const story = new COC7thStory({
        _id: sheet._id,
    });
    const equip = new COC7thEquip({
        _id: sheet._id,
    });
    const avatar = new Avatar({
        _id: sheet._id,
        type: "COC7th"
    })
    try {
        await sheet.save();
        await skill.save();
        await stat.save();
        await story.save();
        await equip.save();
        await avatar.save();
        await User.updateOne({_id: creator._id}, {$inc: {sheet_number: 1}});
        res.send(sheet._id);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

router.post('/COC7th/import/:type', verify, async function (req, res) {
    const creator = jwt.decode(req.cookies['auth_token']);
    const user = await User.findOne({_id: creator._id});
    if (user.sheet_number >= 20) return res.status(400).send('角色卡已達上限');
    if (req.params.type === 'roll20') {
        const sheet = Roll20Translate(req.body.data)
        sheet.info.author = creator._id
        sheet.info.system = "COC7th"
        const info = new Info(sheet.info);
        sheet.skills._id = info._id
        sheet.story._id = info._id
        sheet.stat._id = info._id
        sheet.equip._id = info._id
        //save skill
        const skill = new COC7thSkill(sheet.skills);
        const stat = new COC7thStat(sheet.stat);
        const story = new COC7thStory(sheet.story);
        const equip = new COC7thEquip(sheet.equip);
        const avatar = new Avatar({
            _id: sheet._id,
            type: "COC7th"
        })
        try {
            await info.save();
            await skill.save();
            await stat.save();
            await story.save();
            await equip.save();
            await avatar.save();
            await User.updateOne({_id: creator._id}, {$inc: {sheet_number: 1}});
            res.send(info._id);
        } catch (err) {
            console.log(err)
            res.status(400).send(err);
        }
    }

})

router.post('/COC7th/edit/:id', verify, async function (req, res) {
    const cs = req.body;
    const author = jwt.decode(req.cookies['auth_token']);
    if (!await Info.findOne({_id: req.params.id, author: author._id})) {
        return res.status(403).send('這不是你的角色卡!')
    }
    try {
        if (!['限團務GM', '團務所有人', '所有人'].includes(cs.info.permission)) cs.info.permission = '限團務GM'
        await Info.updateOne({_id: req.params.id}, {
            $set: {
                name: cs.info.name,
                player_name: cs.info.player_name,
                permission: cs.info.permission
            }
        });
        await COC7thSkill.updateOne({_id: req.params.id}, {$set: cs.skill});
        await COC7thStory.updateOne({_id: req.params.id}, {$set: cs.story});
        await COC7thEquip.updateOne({_id: req.params.id}, {$set: cs.equip});
        await COC7thStat.updateOne({_id: req.params.id}, {$set: cs.stat});
        res.send('success');
    } catch (err) {
        console.log(err)
        res.status(400).redirect('/charactersheet');
    }
});


module.exports = router;

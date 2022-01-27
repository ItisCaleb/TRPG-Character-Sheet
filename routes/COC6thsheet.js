const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Info = require('../model/SheetInfo');
const LLtrpgTranslate = require('../utils/converter/LLtrpgCOC6thMap')
//import sheet schema
const COC6thStat = require('../model/COC6th/Stat');
const COC6thStory = require('../model/COC6th/Story');
const COC6thEquip = require('../model/COC6th/Equip');
const COC6thSkill = require('../model/COC6th/Skill');
const Avatar = require('../model/Avatar');


router.get('/COC6th/create/:name', verify, async function (req, res) {
    const creator = jwt.decode(req.cookies['auth_token']);
    const user = await User.findById({_id: creator._id});
    if (user.sheet_number >= 20) return res.status(400).send('角色卡已達上限');
    //save new sheet
    const sheet = new Info({
        name: req.params.name,
        player_name: creator.name,
        system: "COC6th",
        author: creator._id
    });
    //save skill
    const skill = new COC6thSkill({
        _id: sheet._id,
    });
    const stat = new COC6thStat({
        _id: sheet._id,
    });
    const story = new COC6thStory({
        _id: sheet._id,
    });
    const equip = new COC6thEquip({
        _id: sheet._id,
    });
    const avatar = new Avatar({
        _id: sheet._id,
        type: "COC6th"
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

router.post('/COC6th/edit/:id', verify, async function (req, res) {
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
        await COC6thSkill.updateOne({_id: req.params.id}, {$set: cs.skill});
        await COC6thStory.updateOne({_id: req.params.id}, {$set: cs.story});
        await COC6thEquip.updateOne({_id: req.params.id}, {$set: cs.equip});
        await COC6thStat.updateOne({_id: req.params.id}, {$set: cs.stat});
        res.send('success');
    } catch (err) {
        console.log(err)
        res.status(400).redirect('/charactersheet');
    }
});


module.exports = router;

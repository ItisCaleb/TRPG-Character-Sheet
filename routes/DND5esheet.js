const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Info = require('../model/SheetInfo');


const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');
const Avatar = require('../model/Avatar');


router.get('/DND5e/create/:name', verify, async function (req, res) {
    const creator = jwt.decode(req.cookies['auth_token']);
    const user = await User.findOne({_id: creator._id});
    if (user.sheet_number >= 20) return res.status(400).send('角色卡已達上限');
    const sheet = new Info({
        name: req.params.name,
        player_name: creator.name,
        system: "DND5e",
        author: creator._id
    });
    const stat = new DND5eStat({
        _id: sheet._id,
    });
    const story = new DND5eStory({
        _id: sheet._id,
    });
    const spell = new DND5eSpell({
        _id: sheet._id,
    });
    const equip = new DND5eEquip({
        _id: sheet._id,
    });
    const avatar = new Avatar({
        _id: sheet._id,
        type: "DND5e"
    })
    try {
        await sheet.save();
        await stat.save();
        await story.save();
        await spell.save();
        await equip.save();
        await avatar.save();
        await User.updateOne({_id: creator._id}, {$inc: {sheet_number: 1}});
        res.send(sheet._id);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});


router.post('/DND5e/edit/:id', verify, async function (req, res) {
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
        await DND5eSpell.updateOne({_id: req.params.id}, {$set: cs.spell});
        await DND5eStory.updateOne({_id: req.params.id}, {$set: cs.story});
        await DND5eEquip.updateOne({_id: req.params.id}, {$set: cs.equip});
        await DND5eStat.updateOne({_id: req.params.id}, {$set: cs.stat});
        res.send('success');
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


module.exports = router;

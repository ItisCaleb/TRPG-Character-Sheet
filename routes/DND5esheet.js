const router = require('express').Router();
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const DND5e = require('../model/DND5e/DND5e')


router.get('/DND5e/create/:name', verify, async function (req, res) {
    const creator = req.token;
    const user = await User.findById({_id: creator._id});
    if (user.sheet_number >= 20) return res.status(400).send('角色卡已達上限');
    try {
        const sheet = await new DND5e().create(req.params.name, creator.name, creator._id)
        await User.updateOne({_id: creator._id}, {$inc: {sheet_number: 1}});
        res.send(sheet._id);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});


router.post('/DND5e/edit/:id', verify, async function (req, res) {
    const cs = req.body;
    const info = cs.info
    const sheet = new DND5e(req.params.id, req.token._id)
    if (!['限團務GM', '團務所有人', '所有人'].includes(info.permission)) info.permission = '所有人'
    sheet.update(info.name, info.player_name, info.permission, {
        stat: cs.stat,
        story: cs.story,
        equip: cs.equip,
        spell: cs.spell
    })
    try {
        await sheet.exec()
        res.send('success');
    } catch (err) {
        console.log(err);
        //return res.status(403).send('這不是你的角色卡!')
        res.status(400).send(err);
    }
});


module.exports = router;

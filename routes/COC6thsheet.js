const router = require('express').Router();
const verify = require('../utils/verifyToken');
const User = require('../model/User');
//import sheet schema
const COC6th = require("../model/COC6th/COC6th");


router.get('/COC6th/create/:name', verify, async function (req, res) {
    const creator = req.token;
    const user = await User.findById({_id: creator._id});
    if (user.sheet_number >= 20) return res.status(400).send('角色卡已達上限');
    try {
        const sheet = await new COC6th().create(req.params.name, creator.name, creator._id)
        await User.updateOne({_id: creator._id}, {$inc: {sheet_number: 1}});
        res.send(sheet._id);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/COC6th/edit/:id', verify, async function (req, res) {
    const cs = req.body;
    const info = cs.info
    const sheet = new COC6th(req.params.id, req.token._id)
    if (!['限團務GM', '團務所有人', '所有人'].includes(info.permission)) info.permission = '所有人'
    sheet.update(info.name, info.player_name, info.permission, {
        stat: cs.stat,
        story: cs.story,
        equip: cs.equip,
        skill: cs.skill
    })
    try {
        await sheet.exec()
        res.send('success');
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


module.exports = router;

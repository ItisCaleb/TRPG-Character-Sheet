const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const COC7thInfo = require('../model/COC7th/Info');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');

router.post('/COC7th', async (req, res) => {
    const user = jwtDecode(req.cookies.auth_token)._id;
    //create new sheet
    const sheet = new COC7thInfo({
        name:req.body.name,
        class:req.body.class,
        age:req.body.age,
        sex:req.body.sex,
        player_name: req.body.player,
        residence:req.body.residence,
        birthplace:req.body.birthplace,
        skill: req.body.skill,
        author:user
    });
    try{
        //req.app.io.emit('alert',req.body.name + '創建成功'+' GM:'+user);
        res.send(await sheet.save());
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create')
    }
    console.log(req.body);
    //const skill =req.body.sheet;
    //     //try {
    //    await skill.save();
    //}catch (err) {
    //    res.status(400).send(err);
    //    res.redirect('/charactersheet/create')
    //}
});

module.exports = router;
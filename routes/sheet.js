const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const COC7thInfo = require('../model/COC7th/Info');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');

router.post('COC7th', async (req, res) => {
    const user = jwtDecode(req.cookies.auth_token).id;
    //create new sheet
    const sheet = new COC7thInfo({
        name:req.body.name,
        password:req.body.password,
        class:req.body.class,
        age:req.body.age,
        sex:req.body.sex,
        residence:req.body.residence,
        birthplace:req.body.birthplace,
        author:user
    });
    try{
        await sheet.save();
        //req.app.io.emit('alert',req.body.name + '創建成功'+' GM:'+user);
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
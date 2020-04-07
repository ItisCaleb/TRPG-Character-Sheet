const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const COC7thInfo = require('../model/COC7th/Info');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');

router.post('/COC7th', async (req, res) => {
    const user = jwtDecode(req.cookies.auth_token)._id;
    var csheet = req.body;
    //save new sheet
    /*const sheet = new COC7thInfo({
        name:csheet[0].value,
        class:csheet[1].value,
        age:csheet[2].value,
        sex:csheet[3].value,
        player_name: csheet[4].value,
        residence:csheet[5].value,
        birthplace:csheet[6].value,
        author:user
    });
    try{
       await sheet.save();
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create')
    }*/

    //transform skill from object to array
    var skill = [{}];
    for (var i=0;i<Object.keys(csheet[11].value).length;i++){
        var name = Object.keys(csheet[11].value)[i];
        skill[i] = {name :name,number:Object.values(csheet[11].value)[i]};
    }
    console.log(skill);
    //save skill
    /*const cskill = new COC7thSkill({
        _id:sheet._id,
        skill:skill
    });
    const stat = new COC7thStat({
        _id:sheet._id,
        hp:csheet[7].value,
        san:csheet[8].value,
        mp:csheet[9].value,
        luk:csheet[10].value,
        characteristic:csheet[12].value
    });
    try{
        await stat.save();
        await cskill.save();
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create');
    }*/
});

module.exports = router;
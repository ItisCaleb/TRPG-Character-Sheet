const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const User = require('../model/User');
const COC7thInfo = require('../model/Info');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');

router.post('/COC7th', async (req, res) => {
    const id = jwtDecode(req.cookies.auth_token)._id;
    const user = await User.findOne({_id:id});
    const socket = req.app.io.sockets.connected[req.cookies.io] ;
    if (user.sheet_number >= 20 ) return socket.emit('alert','角色卡已達上限');
    var csheet = req.body;
    //save new sheet
    const sheet = new COC7thInfo({
        name:csheet[0].value,
        class:csheet[1].value,
        age:csheet[2].value,
        sex:csheet[3].value,
        player_name: csheet[4].value,
        residence:csheet[5].value,
        birthplace:csheet[6].value,
        system:"COC7th",
        author:id
    });
    try{
       await sheet.save();
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create')
    }

    //transform skill from object to array
    var cskill = [{}];
    for (var i=0;i<Object.keys(csheet[27].value).length;i++){
        var name = Object.keys(csheet[27].value)[i];
        cskill[i] = {name :name,number:Object.values(csheet[27].value)[i]};
    }
    //save skill
    const skill = new COC7thSkill({
        _id:sheet._id,
        skill:cskill
    });
    const stat = new COC7thStat({
        _id:sheet._id,
        hp:csheet[7].value,
        san:csheet[8].value,
        mp:csheet[9].value,
        luk:csheet[10].value,
        injured_status:csheet[11].value,
        insane_status:csheet[12].value,
        characteristic:csheet[28].value
    });
    const story = new COC7thStory({
        _id:sheet._id,
        description:csheet[23].value,
        belief:csheet[13].value,
        significant_people:csheet[14].value,
        meaningful_location:csheet[15].value,
        treasured_possession:csheet[16].value,
        trait:csheet[17].value,
        myth:csheet[18].value,
        injuries:csheet[19].value,
        encounter:csheet[20].value,
        mania:csheet[21].value,
        magic:csheet[22].value
    });
    const equip = new COC7thEquip({
        _id:sheet._id,
        equip:csheet[24].value,
        cash:csheet[25].value,
        weapon:csheet[26].value
    });
    try{
        await skill.save();
        await stat.save();
        await story.save();
        await equip.save();
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create');
    }
});

module.exports = router;
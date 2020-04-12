const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const verify = require('../public/js/verifyToken');
const User = require('../model/User');
const Info = require('../model/Info');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');

router.post('/COC7th', async (req, res) => {
    const id = jwtDecode(req.cookies.auth_token)._id;
    const user = await User.findOne({_id:id});

    if (user.sheet_number >= 20 ) return socket.emit('alert','角色卡已達上限');
    var csheet = req.body;
    //save new sheet
    const sheet = new Info({
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
    for (var i=0;i<Object.keys(csheet[29].value).length;i++){
        var name = Object.keys(csheet[29].value)[i];
        cskill[i] = {name :name,number:Object.values(csheet[29].value)[i]};
    }
    //save skill
    const skill = new COC7thSkill({
        _id:sheet._id,
        class_feature:csheet[28].value,
        skill:cskill
    });
    const stat = new COC7thStat({
        _id:sheet._id,
        hp:csheet[8].value,
        san:csheet[9].value,
        mp:csheet[10].value,
        luk:csheet[11].value,
        injured_status:csheet[12].value,
        insane_status:csheet[13].value,
        characteristic:csheet[30].value
    });
    const story = new COC7thStory({
        _id:sheet._id,
        role_description:csheet[7].value,
        belief:csheet[14].value,
        significant_people:csheet[15].value,
        meaningful_location:csheet[16].value,
        treasured_possession:csheet[17].value,
        trait:csheet[18].value,
        myth:csheet[19].value,
        injuries:csheet[20].value,
        encounter:csheet[21].value,
        mania:csheet[22].value,
        magic:csheet[23].value,
        description:csheet[24].value
    });
    const equip = new COC7thEquip({
        _id:sheet._id,
        equip:csheet[25].value,
        cash:csheet[26].value,
        weapon:csheet[27].value
    });
    try{
        await skill.save();
        await stat.save();
        await story.save();
        await equip.save();
        await User.updateOne({_id:id},{$inc:{sheet_number:1}})
        res.send('角色卡創建成功');
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create');
    }
});

router.get('/COC7th/json/:id',verify,async function (req,res) {
    const url = req.params.id;
    var sheet = {};
    const info = await Info.findOne({_id:url}).lean();
    const skill = await COC7thSkill.findOne({_id:url}).lean();
    const stat = await COC7thStat.findOne({_id:url}).lean();
    const story = await COC7thStory.findOne({_id:url}).lean();
    const equip = await COC7thEquip.findOne({_id:url}).lean();

    sheet.info = info ;
    sheet.skill = skill ;
    sheet.stat = stat ;
    sheet.story = story ;
    sheet.equip = equip ;
    await res.json(JSON.stringify(sheet));

});
router.post('/COC7th/edit/:id',verify,async function(req,res) {

    const id = jwtDecode(req.cookies.auth_token)._id
    var csheet = req.body;
    try{
        await Info.updateOne({_id:req.params.id},{
            name:csheet[0].value,
            class:csheet[1].value,
            age:csheet[2].value,
            sex:csheet[3].value,
            player_name: csheet[4].value,
            residence:csheet[5].value,
            birthplace:csheet[6].value,
        });
    }catch (err) {
        res.status(400).send(err);
    }
    //transform skill from object to array
    var cskill = [{}];
    for (var i=0;i<Object.keys(csheet[29].value).length;i++){
        var name = Object.keys(csheet[29].value)[i];
        cskill[i] = {name :name,number:Object.values(csheet[29].value)[i]};
    }

    try{
        await COC7thSkill.updateOne({_id:req.params.id}, {$set:{
            class_feature:csheet[28].value,
            skill:cskill
        }});
        await COC7thStory.updateOne({_id:req.params.id},{$set:{
            role_description:csheet[7].value,
            belief:csheet[14].value,
            significant_people:csheet[15].value,
            meaningful_location:csheet[16].value,
            treasured_possession:csheet[17].value,
            trait:csheet[18].value,
            myth:csheet[19].value,
            injuries:csheet[20].value,
            encounter:csheet[21].value,
            mania:csheet[22].value,
            magic:csheet[23].value,
            description:csheet[24].value
        }});
        await COC7thEquip.updateOne({_id:req.params.id},{$set: {
            equip:csheet[25].value,
            cash:csheet[26].value,
            weapon:csheet[27].value
        }});
        await COC7thStat.updateOne({_id:req.params.id},{$set: {
            hp:csheet[8].value,
            san:csheet[9].value,
            mp:csheet[10].value,
            luk:csheet[11].value,
            injured_status:csheet[12].value,
            insane_status:csheet[13].value,
            characteristic:csheet[30].value
        }});
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create');
    }
})
router.get('/delete/:id',verify,async function (req,res) {


    const user=jwtDecode(req.cookies.auth_token)._id;
    const info = await Info.findOne({_id:req.params.id});
    if(info.author === user) {
        await Info.deleteOne({_id: req.params.id});
        await COC7thStat.deleteOne({_id: req.params.id});
        await COC7thStory.deleteOne({_id: req.params.id});
        await COC7thSkill.deleteOne({_id: req.params.id});
        await COC7thEquip.deleteOne({_id: req.params.id});
        await User.updateOne({_id:user},{$inc:{sheet_number:-1}})
        res.send('已刪除角色卡')
    }
})

module.exports = router;
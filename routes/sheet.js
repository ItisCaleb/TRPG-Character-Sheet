const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const verify = require('../public/js/verifyToken');
const User = require('../model/User');
const Info = require('../model/Info');
const Session = require('../model/Session');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');

router.post('/COC7th', verify, async (req, res) => {
    const id = jwtDecode(req.cookies.auth_token)._id;
    const user = await User.findOne({_id:id});

    if (user.sheet_number >= 20 ) return res.send('角色卡已達上限');
    var Csheet = req.body;
    //save new sheet
    const sheet = new Info({
        name:Csheet[0].value,
        player_name: Csheet[4].value,
        system:"COC7th",
        permission:Csheet[28].value,
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
    for (var i=0;i<Object.keys(Csheet[30].value).length;i++){
        var name = Object.keys(Csheet[30].value)[i];
        cskill[i] = {name :name,number:Object.values(Csheet[30].value)[i]};
    }
    //save skill
    const skill = new COC7thSkill({
        _id:sheet._id,
        class_feature:Csheet[29].value,
        skill:cskill
    });
    const stat = new COC7thStat({
        _id:sheet._id,
        hp:Csheet[7].value,
        san:Csheet[8].value,
        mp:Csheet[9].value,
        luk:Csheet[10].value,
        injured_status:Csheet[11].value,
        insane_status:Csheet[12].value,
        characteristic:Csheet[31].value
    });
    const story = new COC7thStory({
        _id:sheet._id,
        class:Csheet[1].value,
        age:Csheet[2].value,
        sex:Csheet[3].value,
        residence:Csheet[5].value,
        birthplace:Csheet[6].value,
        role_description:Csheet[16].value,
        belief:Csheet[17].value,
        significant_people:Csheet[18].value,
        meaningful_location:Csheet[19].value,
        treasured_possession:Csheet[20].value,
        trait:Csheet[21].value,
        myth:Csheet[22].value,
        injuries:Csheet[23].value,
        encounter:Csheet[24].value,
        mania:Csheet[25].value,
        magic:Csheet[26].value,
        description:Csheet[27].value
    });
    const equip = new COC7thEquip({
        _id:sheet._id,
        equip:Csheet[13].value,
        cash:Csheet[14].value,
        weapon:Csheet[15].value
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
            player_name: csheet[4].value,
            permission:csheet[28].value
        });
    }catch (err) {
        res.status(400).send(err);
    }
    //transform skill from object to array
    var cskill = [{}];
    for (var i=0;i<Object.keys(csheet[30].value).length;i++){
        var name = Object.keys(csheet[30].value)[i];
        cskill[i] = {name :name,number:Object.values(csheet[30].value)[i]};
    }

    try{
        await COC7thSkill.updateOne({_id:req.params.id}, {$set:{
            class_feature:csheet[29].value,
            skill:cskill
        }});
        await COC7thStory.updateOne({_id:req.params.id},{$set:{
                class:csheet[1].value,
                age:csheet[2].value,
                sex:csheet[3].value,
                residence:csheet[5].value,
                birthplace:csheet[6].value,
                role_description:csheet[16].value,
                belief:csheet[17].value,
                significant_people:csheet[18].value,
                meaningful_location:csheet[19].value,
                treasured_possession:csheet[20].value,
                trait:csheet[21].value,
                myth:csheet[22].value,
                injuries:csheet[23].value,
                encounter:csheet[24].value,
                mania:csheet[25].value,
                magic:csheet[26].value,
                description:csheet[27].value
        }});
        await COC7thEquip.updateOne({_id:req.params.id},{$set: {
            equip:csheet[13].value,
            cash:csheet[14].value,
            weapon:csheet[15].value
        }});
        await COC7thStat.updateOne({_id:req.params.id},{$set: {
            hp:csheet[7].value,
            san:csheet[8].value,
            mp:csheet[9].value,
            luk:csheet[10].value,
            injured_status:csheet[11].value,
            insane_status:csheet[12].value,
            characteristic:csheet[31].value

        }});
        res.write(JSON.stringify({ status: "OK" }));
        res.end();
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet');
    }
})
router.get('/delete/:id',verify,async function (req,res) {

    const sheetId = req.params.id;
    const user=jwtDecode(req.cookies.auth_token)._id;
    const info = await Info.findOne({_id:sheetId});
    if(info.author === user) {
        await Info.deleteOne({_id: sheetId});
        await COC7thStat.deleteOne({_id: sheetId});
        await COC7thStory.deleteOne({_id: sheetId});
        await COC7thSkill.deleteOne({_id: sheetId});
        await COC7thEquip.deleteOne({_id: sheetId});
        await User.updateOne({_id:user},{$inc:{sheet_number:-1}})
        try {
            const session = await Session.find({sheet: sheetId})
            for (const sheet of session) {
                await Session.updateOne({sheet:req.params.id},{$pull:{sheet:sheetId}})
            }
            res.send('已刪除角色卡')
        }catch (err) {

        }
    }else return res.send('你並無權限修改此角色卡')
})

module.exports = router;
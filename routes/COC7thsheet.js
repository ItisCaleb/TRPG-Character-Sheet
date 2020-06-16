const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const verify = require('./module/verifyToken');
const User = require('../model/User');
const Info = require('../model/Info');
const dotenv = require('dotenv');
const multer = require('multer');
const Session = require('../model/Session');


//import sheet schema
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');


dotenv.config()

// image filter middleware
const upload = multer({
    limit:{
        fileSize:500000
    },
    fileFilter(req,file,cb){
        console.log(file.originalname);
        cb(null,true);
    }
})
router.post('/COC7th', verify,upload.single('file'), async function (req, res)  {
    const id = jwtDecode(req.cookies.auth_token)._id;
    const user = await User.findOne({_id:id});
    if (user.sheet_number >= 20 ) return res.send('角色卡已達上限');
    var cs = req.body;
    var image;
    (req.file) ? image=req.file.buffer : image='';
    var cskill = [{}];
    for (let i=0;i<Object.keys(JSON.parse(cs.skill)).length;i++){
        var name = Object.keys(JSON.parse(cs.skill))[i];
        cskill[i] = {name :name,number:Object.values(JSON.parse(cs.skill))[i]};
    }
    //save new sheet
    if(!cs.name) return res.status(400).send('請至少填入角色名字');
    const sheet = new Info({
        name:cs.name,
        player_name: cs.player,
        system:"COC7th",
        permission:cs.permission,
        author:id
    });
    try{
       await sheet.save();
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create')
    }
    //save skill
    const skill = new COC7thSkill({
        _id:sheet._id,
        class_feature:cs['class-feature'],
        skill:cskill
    });
    const stat = new COC7thStat({
        _id:sheet._id,
        hp:cs.hp,
        san:cs.san,
        mp:cs.mp,
        luk:cs.luk,
        injured_status:cs.injury,
        insane_status:cs.madness,
        characteristic:JSON.parse(cs.stat)
    });
    const story = new COC7thStory({
        _id:sheet._id,
        class:cs.class,
        age:cs.age,
        sex:cs.sex,
        residence:cs.residence,
        birthplace:cs.birthplace,
        role_description:cs.role_description,
        belief:cs.belief,
        significant_people:cs.significant_people,
        meaningful_location:cs.meaningful_location,
        treasured_possession:cs.treasured_possession,
        trait:cs.trait,
        myth:cs.myth,
        injuries:cs.injuries,
        encounter:cs.encounter,
        mania:cs.mania,
        magic:cs.magic,
        description:cs.description,
        avatar:image
    });
    const equip = new COC7thEquip({
        _id:sheet._id,
        equip:cs.equip,
        cash:cs.money,
        weapon:cs.weapon
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
    const skill = await COC7thSkill.findOne({_id:url}).lean();
    const stat = await COC7thStat.findOne({_id:url}).lean();
    const story = await COC7thStory.findOne({_id:url}).lean();

    sheet.skill = skill ;
    sheet.stat = stat ;
    sheet.story = story ;
    await res.json(JSON.stringify(sheet));

});
router.put('/COC7th/edit/:id',verify,upload.single('file'),async function(req,res) {
    const cs = req.body;
    console.log(cs)
    /*try{
        await Info.updateOne({_id:req.params.id},{
            name:cs.name,
            player_name: cs.player,
            permission:cs.permission
        });
    }catch (err) {
        res.status(400).send(err);
    }
    //transform skill from object to array
    var cskill = [{}];
    var image;
    (req.file) ? image=req.file.buffer : image='';
    for (let i = 0; i<Object.keys(JSON.parse(cs.skill)).length; i++){
        var name = Object.keys(JSON.parse(cs.skill))[i];
        cskill[i] = {name :name,number:Object.values(JSON.parse(cs.skill))[i]};
    }
    try{
        await COC7thSkill.updateOne({_id:req.params.id}, {$set:{
            class_feature:cs['class-feature'],
            skill:cskill
        }});
        await COC7thStory.updateOne({_id:req.params.id},{$set:{
                class:cs.class,
                age:cs.age,
                sex:cs.sex,
                residence:cs.residence,
                birthplace:cs.birthplace,
                role_description:cs.role_description,
                belief:cs.belief,
                significant_people:cs.significant_people,
                meaningful_location:cs.meaningful_location,
                treasured_possession:cs.treasured_possession,
                trait:cs.trait,
                myth:cs.myth,
                injuries:cs.injuries,
                encounter:cs.encounter,
                mania:cs.mania,
                magic:cs.magic,
                description:cs.description,
                avatar:image
        }});
        await COC7thEquip.updateOne({_id:req.params.id},{$set: {
                equip:cs.equip,
                cash:cs.money,
                weapon:cs.weapon
        }});
        await COC7thStat.updateOne({_id:req.params.id},{$set: {
                hp:cs.hp,
                san:cs.san,
                mp:cs.mp,
                luk:cs.luk,
                injured_status:cs.injury,
                insane_status:cs.madness,
                characteristic:JSON.parse(cs.stat)
        }});
        res.status(200).send()
    }catch (err) {
        console.log(err)
        res.status(400).redirect('/charactersheet');
    }*/
})


module.exports = router;
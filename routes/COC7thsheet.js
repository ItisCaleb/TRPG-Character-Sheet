const router = require('express').Router();
const jwt = require('jsonwebtoken');
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


dotenv.config();

// image filter middleware
const upload = multer({
    limit:{
        fileSize:500000
    },
    fileFilter(req,file,cb){
        console.log(file.originalname);
        cb(null,true);
    }
});
router.get('/COC7th/create/:name', verify, async function (req, res)  {
    const creator = jwt.decode(req.cookies['auth_token']);
    const user = await User.findOne({_id:creator._id});
    if (user.sheet_number >= 20 ) return res.send('角色卡已達上限');
    //save new sheet
    const name= req.params.name;
    const sheet = new Info({
        name:name,
        player_name: creator.name,
        system:"COC7th",
        author:creator._id
    });
    //save skill
    const skill = new COC7thSkill({
        _id:sheet._id,
    });
    const stat = new COC7thStat({
        _id:sheet._id,
    });
    const story = new COC7thStory({
        _id:sheet._id,
    });
    const equip = new COC7thEquip({
        _id:sheet._id,
    });
    try{
        await sheet.save();
        await skill.save();
        await stat.save();
        await story.save();
        await equip.save();
        await User.updateOne({_id:creator._id},{$inc:{sheet_number:1}});
        res.send(sheet._id);
    }catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});
router.get('/COC7th/json/:id',verify,async function (req,res) {
    const url = req.params.id;
    var sheet = {};
    const skill = await COC7thSkill.findOne({_id:url}).lean();
    const story = await COC7thStory.findOne({_id:url}).lean();

    sheet.skill = skill ;
    sheet.story = story ;
    await res.json(JSON.stringify(sheet));

});
router.post('/COC7th/edit/:id',verify,async function(req,res) {
    const cs = req.body;
    try{
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
        res.send('');
    }catch (err) {
        console.log(err)
        res.status(400).redirect('/charactersheet');
    }
});

router.post('/COC7th/image/:id',upload.single('file'),verify,async function (req,res) {
    const image = (req.file) ?req.file.buffer:'';
    await COC7thStory.updateOne({_id:req.params.id},{
        avatar:image
    })
    res.sendStatus(200);
});


module.exports = router;

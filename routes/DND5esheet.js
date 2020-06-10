const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const verify = require('../public/js/verifyToken');
const User = require('../model/User');
const Info = require('../model/Info');
const dotenv = require('dotenv');
const multer = require('multer');
const Session = require('../model/Session');

const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');

dotenv.config()

const upload = multer({
    limit:{
        fileSize:500000
    },
    fileFilter(req,file,cb){
        console.log(file.originalname);
        cb(null,true);
    }
})

router.post('/DND5e',verify,upload.single('file'), async function (req,res) {
    const id = jwtDecode(req.cookies.auth_token)._id;
    const user = await User.findOne({_id:id});
    if (user.sheet_number >= 20 ) return res.send('角色卡已達上限');
    var cs = req.body;
    var image;
    (req.file) ? image=req.file.buffer : image='';
    //save new sheet
    if(!cs.name) return res.status(400).send('請至少填入角色名字');
    const sheet = new Info({
        name:cs.name,
        player_name: cs.player,
        system:"DND5e",
        permission:cs.permission,
        author:id
    });
    try{
        await sheet.save();
    }catch (err) {
        res.status(400).send(err);
        res.redirect('/charactersheet/create')
    }
    const skill = new DND5eStat({
        _id:sheet._id,
       stat:cs.stat,
       inspiration:cs.inspiration,
       pro:cs.pro,
       skill:cs.skill,
       armor:cs.armor,
       initiative:cs.initiative,
       speed:cs.speed,
       max_hp:cs.max_hp,
       hp:cs.hp,
       temp_hp:cs.temp_hp,
       hitdice:cs.hitdice,
       hitdicetotal:cs.hitdicetotal,
    });
    const story = new DND5eStory({
        _id:sheet._id,
        class: cs.class,
        level: cs.level,
        background: cs.background,
        race: cs.race,
        faction: cs.faction,
        exp: cs.exp,
        personality: cs.personality,
        trait:cs.trait,
        ideals: cs.ideals,
        bonds: cs.bonds,
        flaws: cs.flaws,
        language: cs.language,
        role_description: cs.role_description,
        height: cs.height,
        skin: cs.skin,
        age: cs.age,
        weight: cs.weight,
        hair: cs.hair,
        alignment: cs.alignment,
        backstory: cs.backstory,
        otherTrait: cs.otherTrait,
        treasure: cs.treasure
    })
    const spell =new DND5eSpell({
        _id:sheet._id,
        spell_class:cs.spell_class,
        spell_ability:cs.spell_ability,
        spell_save:cs.spell_save,
        spell_bonus:cs.spell_bonus,
        spell:cs.spell
    })
    const equip =new DND5eEquip({
        _id:sheet._id,
        attack:cs.attack,
        money:cs.money,
        armor:cs.armor,
    })
    try{
        await skill.save();
        await story.save();
        await spell.save();
        await equip.save();
        await User.updateOne({_id:id},{$inc:{sheet_number:1}})
        res.send('角色卡創建成功');
    }catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

})

router.get('/DND5e/json/:id',async function (req,res) {
    const url = req.params.id;
    var sheet = {};
    const info = await Info.findOne({_id:url}).lean();
    const skill = await DND5eStat.findOne({_id:url}).lean();
    const stat = await DND5eStat.findOne({_id:url}).lean();
    const story = await DND5eStory.findOne({_id:url}).lean();
    const equip = await DND5eEquip.findOne({_id:url}).lean();

    sheet.info = info ;
    sheet.skill = skill ;
    sheet.stat = stat ;
    sheet.story = story ;
    sheet.equip = equip ;
    await res.json(JSON.stringify(sheet));
})

module.exports= router
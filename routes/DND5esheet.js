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
    const cs = req.body;
    const image=(req.file) ? req.file.buffer : '';
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
    const stat = new DND5eStat({
        _id:sheet._id,
       stat:JSON.parse(cs.stat),
       inspiration:cs.inspiration,
       pro:cs.pro,
       skills:JSON.parse(cs.skill),
       armorValue:cs.armorValue,
       initiative:cs.initiative,
       speed:cs.speed,
       max_hp:cs['max-hp'],
       hp:cs.hp,
       temp_hp:cs['temp-hp'],
       hit_dice_total:cs.hit_dice_total,
       hit_dice:cs.hit_dice
    });
    const story = new DND5eStory({
        _id:sheet._id,
        class: cs.class,
        level: cs.level,
        background: cs.background,
        race: cs.race,
        faction: cs.faction,
        exp: cs.exp,
        height: cs.height,
        skin: cs.skin,
        age: cs.age,
        weight: cs.weight,
        hair: cs.hair,
        trait:cs.trait,
        role_description: cs['role-description'],
        alignment: cs.alignment,
        backstory: cs.backstory,
        otherTrait: cs.otherTrait,
        treasure: cs.treasure,
        personality: cs.personality,
        ideals: cs.ideals,
        bonds: cs.bonds,
        flaws: cs.flaws,
        language: cs.language,
        avatar:image
    })
    const spell =new DND5eSpell({
        _id:sheet._id,
        spell_class:cs['spell-class'],
        spell_ability:cs['spell-ability'],
        spell_save:cs['spell-save'],
        spell_bonus:cs['spell-bonus'],
        spell:JSON.parse(cs.spell)
    })
    const equip =new DND5eEquip({
        _id:sheet._id,
        attack:JSON.parse(cs.attack),
        money:JSON.parse(cs.money),
        equipment:cs.equip,
    })
    try{
        await stat.save();
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
    const spell = await DND5eSpell.findOne({_id:url}).lean();
    const stat = await DND5eStat.findOne({_id:url}).lean();
    const story = await DND5eStory.findOne({_id:url}).lean();
    const equip = await DND5eEquip.findOne({_id:url}).lean();

    sheet.info = info ;
    sheet.spell = spell ;
    sheet.stat = stat ;
    sheet.story = story ;
    sheet.equip = equip ;
    await res.json(JSON.stringify(sheet));
})

router.post('/DND5e/edit/:id',verify,upload.single('file'),async function (req,res) {
    const cs = req.body;
    const image= (req.file) ? req.file.buffer : '';
    //save new sheet
    if(!cs.name) return res.status(400).send('請至少填入角色名字');
    try{
        await Info.updateOne({_id:req.params.id},{
            name:cs.name,
            player_name: cs.player,
            permission:cs.permission,
        })
    }catch (err) {
        res.status(400).send(err);
    }
    try{
        await DND5eStat.updateOne({_id:req.params.id},{
            stat:JSON.parse(cs.stat),
            inspiration:cs.inspiration,
            pro:cs.pro,
            skills:JSON.parse(cs.skill),
            armorValue:cs.armorValue,
            initiative:cs.initiative,
            speed:cs.speed,
            max_hp:cs['max-hp'],
            hp:cs.hp,
            temp_hp:cs['temp-hp'],
            hit_dice_total:cs.hit_dice_total,
            hit_dice:cs.hit_dice

        })

        await DND5eStory.updateOne({_id:req.params.id},{
            class: cs.class,
            level: cs.level,
            background: cs.background,
            race: cs.race,
            faction: cs.faction,
            exp: cs.exp,
            height: cs.height,
            skin: cs.skin,
            age: cs.age,
            weight: cs.weight,
            hair: cs.hair,
            trait:cs.trait,
            role_description: cs['role-description'],
            alignment: cs.alignment,
            backstory: cs.backstory,
            otherTrait: cs.otherTrait,
            treasure: cs.treasure,
            personality: cs.personality,
            ideals: cs.ideals,
            bonds: cs.bonds,
            flaws: cs.flaws,
            language: cs.language,
            avatar:image
        });
        await DND5eSpell.updateOne({_id:req.params.id},{
            spell_class:cs['spell-class'],
            spell_ability:cs['spell-ability'],
            spell_save:cs['spell-save'],
            spell_bonus:cs['spell-bonus'],
            spell:JSON.parse(cs.spell)
        })
        await DND5eEquip.updateOne({_id:req.params.id},{
            attack:JSON.parse(cs.attack),
            money:JSON.parse(cs.money),
            equipment:cs.equip,
        });
        res.status(200).send()
    }catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})


module.exports= router
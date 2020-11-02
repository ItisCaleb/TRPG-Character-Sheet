const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const User = require('../model/User');
const Info = require('../model/sheetInfo');
const dotenv = require('dotenv');
const multer = require('multer');
const Session = require('../model/Session');

const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');

dotenv.config();



router.get('/DND5e/create/:name',verify,async function (req,res) {
    res.status(400).send('還在施工中')
    /*const creator = jwt.decode(req.cookies['auth_token']);
    const user = await User.findOne({_id:creator._id});
    if (user.sheet_number >= 20 ) return res.send('角色卡已達上限');
    const sheet = new Info({
        name:req.params.name,
        player_name: creator.name,
        system:"DND5e",
        author:creator._id
    });

    const stat = new DND5eStat({
        _id:sheet._id,
    });
    const story = new DND5eStory({
        _id:sheet._id,
    });
    const spell =new DND5eSpell({
        _id:sheet._id,
    });
    const equip =new DND5eEquip({
        _id:sheet._id,
    });
    try{
        await sheet.save();
        await stat.save();
        await story.save();
        await spell.save();
        await equip.save();
        await User.updateOne({_id:creator._id},{$inc:{sheet_number:1}});
        res.send(sheet._id);
    }catch (err) {
        console.log(err);
        res.status(400).send(err);
    }*/

});


router.post('/DND5e/edit/:id',verify,async function (req,res) {
    const cs = req.body;
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
            passive_wisdom:cs['passive-wisdom'],
            inspiration:cs.inspiration,
            pro:cs.pro,
            armorValue:cs.armorValue,
            initiative:cs.initiative,
            speed:cs.speed,
            max_hp:cs['max-hp'],
            hp:cs.hp,
            temp_hp:cs['temp-hp'],

            hit_dice_total:cs.hit_dice_total,
            hit_dice:cs.hit_dice,
            spell_class:cs['spell-class'],
            spell_ability:cs['spell-ability'],
            spell_save:cs['spell-save'],
            spell_bonus:cs['spell-bonus'],

        });

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
        });
        await DND5eSpell.updateOne({_id:req.params.id},{
            death_save:JSON.parse(cs.death_save),
            skills:JSON.parse(cs.skill),
            spell:JSON.parse(cs.spell)
        });
        await DND5eEquip.updateOne({_id:req.params.id},{
            attack:JSON.parse(cs.attack),
            money:JSON.parse(cs.money),
            equipment:cs.equip,
        });
        res.send('');
    }catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});



module.exports= router;

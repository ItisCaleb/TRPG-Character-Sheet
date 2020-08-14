const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const verify = require('./module/verifyToken');
const User = require('../model/User');
const Info = require('../model/Info');
const Session = require('../model/Session');

//import sheet schema
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');
const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');

router.delete('/delete/:id',verify,async function (req,res) {

    const sheetId = req.params.id;
    const user=jwtDecode(req.cookies['auth_token'])._id;
    const info = await Info.findOne({_id:sheetId});
    if(info.author === user) {
        if(info.system==='COC7th'){
            await COC7thStat.deleteOne({_id: sheetId});
            await COC7thStory.deleteOne({_id: sheetId});
            await COC7thSkill.deleteOne({_id: sheetId});
            await COC7thEquip.deleteOne({_id: sheetId});
        }if(info.system==='DND5e'){
            await DND5eStat.deleteOne({_id: sheetId});
            await DND5eStory.deleteOne({_id: sheetId});
            await DND5eSpell.deleteOne({_id: sheetId});
            await DND5eEquip.deleteOne({_id: sheetId});
        }
        await Info.deleteOne({_id: sheetId});
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

module.exports=router;
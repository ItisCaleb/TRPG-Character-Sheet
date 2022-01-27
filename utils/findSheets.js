const Info = require('../model/SheetInfo')
const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');
const COC6thStat = require('../model/COC6th/Stat');
const COC6thStory = require('../model/COC6th/Story');
const COC6thEquip = require('../model/COC6th/Equip');
const COC6thSkill = require('../model/COC6th/Skill');


module.exports = function (req) {
    return new Promise(async (resolve, reject) => {
        let info;
        let id = req.params.id
        try {
            info = await Info.findById({_id:id}).lean()
        }catch(err) {
            reject(err)
        }
        if(!info) return reject("notFound")
        if(req.params.system !== info.system) return reject('Wrong System')
        const system=info.system
        let sheet = {}
        switch (system) {
            case 'COC7th':
                sheet = {
                    info: info,
                    stat: await COC7thStat.findById({_id: id}).lean(),
                    story: await COC7thStory.findById({_id: id}).lean(),
                    equip: await COC7thEquip.findById({_id: id}).lean(),
                    skill: await COC7thSkill.findById({_id: id}).lean()
                }
                resolve(sheet)
                break;
            case 'COC6th':
                sheet = {
                    info: info,
                    stat: await COC6thStat.findById({_id: id}).lean(),
                    story: await COC6thStory.findById({_id: id}).lean(),
                    equip: await COC6thEquip.findById({_id: id}).lean(),
                    skill: await COC6thSkill.findById({_id: id}).lean()
                }
                resolve(sheet)
                break;
            case 'DND5e':
                sheet = {
                    info: info,
                    stat: await DND5eStat.findById({_id: id}).lean(),
                    story: await DND5eStory.findById({_id: id}).lean(),
                    equip: await DND5eEquip.findById({_id: id}).lean(),
                    spell: await DND5eSpell.findById({_id: id}).lean()
                }
                resolve(sheet)
                break;
        }
    })
};

const Info = require('../model/sheetInfo')
const DND5eStat = require('../model/DND5e/Stat');
const DND5eStory = require('../model/DND5e/Story');
const DND5eEquip = require('../model/DND5e/Equip');
const DND5eSpell = require('../model/DND5e/Spell');
const COC7thStat = require('../model/COC7th/Stat');
const COC7thStory = require('../model/COC7th/Story');
const COC7thEquip = require('../model/COC7th/Equip');
const COC7thSkill = require('../model/COC7th/Skill');


module.exports = function (id) {
    return new Promise(async (resolve, reject) => {
        let info;
        try {
            info = await Info.findOne({_id:id}).lean()
        }catch(err) {
            reject(err)
        }
        if(!info) return reject("notFound")
        const system=info.system
        let sheet = {}
        switch (system) {
            case 'COC7th':
                sheet = {
                    info: info,
                    stat: await COC7thStat.findOne({_id: id}).lean(),
                    story: await COC7thStory.findOne({_id: id}).lean(),
                    equip: await COC7thEquip.findOne({_id: id}).lean(),
                    skill: await COC7thSkill.findOne({_id: id}).lean()
                }
                resolve(sheet)
                break;
            case 'DND5e':
                sheet = {
                    info: info,
                    stat: await DND5eStat.findOne({_id: id}).lean(),
                    story: await DND5eStory.findOne({_id: id}).lean(),
                    equip: await DND5eEquip.findOne({_id: id}).lean(),
                    spell: await DND5eSpell.findOne({_id: id}).lean()
                }
                resolve(sheet)
                break;
        }
    })
};

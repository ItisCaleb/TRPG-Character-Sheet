const Info = require('../../model/Info')
const DND5eStat = require('../../model/DND5e/Stat');
const DND5eStory = require('../../model/DND5e/Story');
const DND5eEquip = require('../../model/DND5e/Equip');
const DND5eSpell = require('../../model/DND5e/Spell');

const COC7thStat = require('../../model/COC7th/Stat');
const COC7thStory = require('../../model/COC7th/Story');
const COC7thEquip = require('../../model/COC7th/Equip');
const COC7thSkill = require('../../model/COC7th/Skill');

module.exports = async function (system,id) {
    var sheet = {};
    if(system==='COC7th'){
        const info = await Info.findOne({_id:id}).lean();
        const stat = await COC7thStat.findOne({_id:id}).lean();
        const story = await COC7thStory.findOne({_id:id}).lean();
        const equip = await COC7thEquip.findOne({_id:id}).lean();

        sheet.info = info ;
        sheet.stat = stat ;
        sheet.story = story ;
        sheet.equip = equip ;
        return sheet
    }

}
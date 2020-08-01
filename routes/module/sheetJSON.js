const Info = require('../../model/Info')
const DND5eStat = require('../../model/DND5e/Stat');
const DND5eStory = require('../../model/DND5e/Story');
const DND5eEquip = require('../../model/DND5e/Equip');


const COC7thStat = require('../../model/COC7th/Stat');
const COC7thStory = require('../../model/COC7th/Story');
const COC7thEquip = require('../../model/COC7th/Equip');


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
    if(system==='DND5e'){
        const info = await Info.findOne({_id:id}).lean();
        const stat = await DND5eStat.findOne({_id:id}).lean();
        const story = await DND5eStory.findOne({_id:id}).lean();
        const equip = await DND5eEquip.findOne({_id:id}).lean();

        sheet.info = info ;
        sheet.stat = stat ;
        sheet.story = story ;
        sheet.equip = equip ;
        return sheet
    }

};
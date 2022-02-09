const COC6thStat = require('./Stat');
const COC6thStory = require('./Story');
const COC6thEquip = require('./Equip');
const COC6thSkill = require('./Skill');
const CharacterSheet = require('../CharacterSheet')
class COC6th extends CharacterSheet{
    constructor(){
        super({
            stat: COC6thStat,
            story: COC6thStory,
            equip: COC6thEquip,
            skill: COC6thSkill
        })
    }
    create(name, player, author_id) {
        return super.create(name, player, "COC6th", author_id);
    }
}

module.exports = COC6th

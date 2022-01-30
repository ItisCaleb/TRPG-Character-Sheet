const COC7thStat = require('./Stat');
const COC7thStory = require('./Story');
const COC7thEquip = require('./Equip');
const COC7thSkill = require('./Skill');
const CharacterSheet = require('../CharacterSheet')
class COC7th extends CharacterSheet{
    constructor(id=null, author = null){
        super(id, "COC7th", {
            stat: COC7thStat,
            story: COC7thStory,
            equip: COC7thEquip,
            skill: COC7thSkill
        }, author)
    }
    create(name, player, author_id) {
        return super.create(name, player, "COC7th", author_id);
    }
}

module.exports = COC7th

const DND5eStat = require('./Stat');
const DND5eStory = require('./Story');
const DND5eEquip = require('./Equip');
const DND5eSpell = require('./Spell');
const CharacterSheet = require('../CharacterSheet')
class DND5e extends CharacterSheet{
    constructor(id=null, author = null){
       super(id, "DND5e", {
           stat: DND5eStat,
           story: DND5eStory,
           equip: DND5eEquip,
           spell: DND5eSpell
       }, author)
    }
    create(name, player, author_id) {
        return super.create(name, player, "DND5e", author_id);
    }
}

module.exports = DND5e

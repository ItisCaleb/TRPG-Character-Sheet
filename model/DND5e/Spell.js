const mongoose = require("mongoose");

const  DND5eSpellSchema = new mongoose.Schema({
    spell_class:String,
    spell_ability:String,
    spell_save:String,
    spell_bonus:String,
    zero:Array,
    one:Array,
    two:Array,
    three:Array,
    four:Array,
    five:Array,
    six:Array,
    seven:Array,
    eight:Array,
    nine:Array
});

module.exports = mongoose.model("DND5e_Spell",DND5eSpellSchema);
const mongoose = require("mongoose");

const  DND5eSpellSchema = new mongoose.Schema({
    spell_class:String,
    spell_ability:String,
    spell_save:String,
    spell_bonus:String,
    spell:Object
});

module.exports = mongoose.model("DND5e_Spell",DND5eSpellSchema);
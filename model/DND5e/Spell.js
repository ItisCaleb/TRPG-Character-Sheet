const mongoose = require("mongoose");

const  DND5eSpellSchema = new mongoose.Schema({
    skills:Array,
    death_save:[String],
    spell:Object
});

module.exports = mongoose.model("DND5e_Spell",DND5eSpellSchema);
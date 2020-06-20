const mongoose = require("mongoose");

const  DND5eStatSchema = new mongoose.Schema({
    stat: Array,
    inspiration:Number,
    passive_wisdom:Number,
    pro:Number,
    armorValue:Number,
    initiative:Number,
    speed:Number,
    max_hp:Number,
    hp:Number,
    temp_hp:Number,
    hit_dice_total:Number,
    hit_dice:String,
    death_save:[Number],
    spell_class:String,
    spell_ability:String,
    spell_save:String,
    spell_bonus:String,
});

module.exports = mongoose.model("DND5e_Stat",DND5eStatSchema);
const mongoose = require("mongoose");

const  DND5eStatSchema = new mongoose.Schema({
    stat: Array,
    inspiration:Number,
    pro:Number,
    skills:Array,
    armorValue:Number,
    initiative:Number,
    speed:Number,
    max_hp:Number,
    hp:Number,
    temp_hp:Number,
    hit_dice_total:Number,
    hit_dice:String,
    death_save:[Number]
});

module.exports = mongoose.model("DND5e_Stat",DND5eStatSchema);
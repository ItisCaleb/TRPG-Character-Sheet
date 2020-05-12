const mongoose = require("mongoose");

const  DND5eStatSchema = new mongoose.Schema({
    stat:[Number],
    inspiration:Number,
    pro:Number,
    saving:Array,
    skills:Array,
    armor:Number,
    initiative:Number,
    speed:Number,
    max_hp:Number,
    hp:Number,
    temp_hp:Number,
    hitdice:String,
    hitdicetotal:Number,
    death_save:[Number]
});

module.exports = mongoose.model("DND5eStat",DND5eStatSchema);
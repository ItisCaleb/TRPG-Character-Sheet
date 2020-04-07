const mongoose = require("mongoose");

const COC7thStatSchema = new mongoose.Schema({
    hp:Number,
    san:Number,
    mp:Number,
    luk:Number,
    insane_status:String,
    injured_status:String,
    characteristic:Array
});

module.exports = mongoose.model("COC7th_Stat",COC7thStatSchema);
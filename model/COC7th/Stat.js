const mongoose = require("mongoose");

const COC7thStatSchema = new mongoose.Schema({
    stat:Object,
    //hp:Array,
    //san:Array,
    //mp:Array,
    //luk:Array,
    //db:Number,
    //build:Number,
    //mov:Number,
    insane_status:String,
    injured_status:String,
    characteristic:Array
});

module.exports = mongoose.model("COC7th_Stat",COC7thStatSchema);
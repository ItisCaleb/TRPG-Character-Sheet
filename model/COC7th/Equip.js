const mongoose = require("mongoose");

const COC7thEquipSchema = new mongoose.Schema({
    equip:Array,
    cash:String,
    weapon:Array
});

module.exports = mongoose.model("COC7th_Equip",COC7thEquipSchema);
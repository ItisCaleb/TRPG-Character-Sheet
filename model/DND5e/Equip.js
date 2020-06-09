const mongoose = require("mongoose");

const  DND5eEquipSchema = new mongoose.Schema({
    attack:Array,
    money:Array,
    armor:String
});

module.exports = mongoose.model("DND5eEquip",DND5eEquipSchema);
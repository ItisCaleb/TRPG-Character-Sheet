const mongoose = require("mongoose");

const  DND5eEquipSchema = new mongoose.Schema({
    attack:Array,
    money:Array,
    equipment:String
});

module.exports = mongoose.model("DND5e_Equip",DND5eEquipSchema);
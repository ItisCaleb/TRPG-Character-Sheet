const mongoose = require("mongoose");

const COC7thEquipSchema = new mongoose.Schema({
    equip: String,
    cash: String,
    weapon: String
});

module.exports = mongoose.model("COC7th_Equip", COC7thEquipSchema);
const mongoose = require("mongoose");

const COC7thEquipSchema = new mongoose.Schema({
    equip: {
        type:String,
        max:1024
    },
    cash: {
        type:String,
        max:512
    },
    weapon: {
        type:String,
        max:1024
    },
});

module.exports = mongoose.model("COC7th_Equip", COC7thEquipSchema);
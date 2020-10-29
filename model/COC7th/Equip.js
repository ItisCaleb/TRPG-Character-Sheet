const mongoose = require("mongoose");

const COC7thEquipSchema = new mongoose.Schema({
    equip: {
        type:String,
        max:512,
        default:''
    },
    cash: {
        type:String,
        max:128,
        default:''
    },
    weapon: {
        type:String,
        max:256,
        default:''
    },
});

module.exports = mongoose.model("COC7th_Equip", COC7thEquipSchema);
const mongoose = require("mongoose");

const  DND5eEquipSchema = new mongoose.Schema({
    attack:{
        type:Array,
        default: ['','','','','','','','','']
    },
    money:Array,
    equipment:{
        type: String,
        max: 1024,
        default:''
    },
});

module.exports = mongoose.model("DND5e_Equip",DND5eEquipSchema);
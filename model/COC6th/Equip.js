const mongoose = require("mongoose");

const COC6thEquipSchema = new mongoose.Schema({
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
        type:Object,
        default:{
            melee:[],
            firearm:[]
        },
        minimize:false
    },
});

module.exports = mongoose.model("COC6th_Equip", COC6thEquipSchema);

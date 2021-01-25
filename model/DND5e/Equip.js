const mongoose = require("mongoose");

const  DND5eEquipSchema = new mongoose.Schema({
    attack:{
        type:Object,
        default: {
            first:"",
            second:"",
            third:"",
            spells:""
        }
    },
    money: {
        type:Object,
        default:{
            cp:0,
            sp:0,
            ep:0,
            gp:0,
            pp:0
        }
    },
    equipment:{
        type: String,
        max: 2048,
        default:''
    },
    treasure: {
        type: String,
        max: 2048,
        default:''
    },
    language: {
        type: String,
        max: 1024,
        default:''
    }
});

module.exports = mongoose.model("DND5e_Equip",DND5eEquipSchema);

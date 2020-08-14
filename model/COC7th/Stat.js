const mongoose = require("mongoose");

const COC7thStatSchema = new mongoose.Schema({
    hp:{
        type:Number,
        max:40,
        default:0
    },
    san:{
        type:Number,
        max:100,
        default:0
    },
    mp:{
        type:Number,
        max:40,
        default:0
    },
    luk:{
        type:Number,
        max:100,
        default:0
    },
    insane_status:{
        type:String,
        max:20,
        default:'無'
    },
    injured_status:{
        type:String,
        max:20,
        default:'無'
    },
    characteristic:Array
});

module.exports = mongoose.model("COC7th_Stat",COC7thStatSchema);
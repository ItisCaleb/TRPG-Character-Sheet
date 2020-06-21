const mongoose = require("mongoose");

const COC7thStatSchema = new mongoose.Schema({
    hp:{
        type:Number,
        max:40
    },
    san:{
        type:Number,
        max:100
    },
    mp:{
        type:Number,
        max:40
    },
    luk:{
        type:Number,
        max:100
    },
    insane_status:{
        type:String,
        max:20
    },
    injured_status:{
        type:String,
        max:20
    },
    characteristic:Array
});

module.exports = mongoose.model("COC7th_Stat",COC7thStatSchema);
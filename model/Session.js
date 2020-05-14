const mongoose = require("mongoose");

const  TRPGSessionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:30
    },
    password:{
        type:String,
        required: true,
        min:3,
        max:15
    },
    gm:{
        type:String,
        required:true,
    },
    player:{
        type:Array,
    },
    sheet:[String],
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("TRPGSession",TRPGSessionSchema);
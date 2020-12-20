const mongoose = require("mongoose");

const  TRPGSessionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:30
    },
    gm:{
        type:String,
        required:true,
    },
    player:[String],
    sheet:Object,
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("TRPGSession",TRPGSessionSchema);

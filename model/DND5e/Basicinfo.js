const mongoose = require("mongoose");

const  DND5eSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:1
    },
    class:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        required: true
    },
    race:{
        type:String,
        required:true
    },
    backstory:String,
    exp:String
});

module.exports = mongoose.model("DND5e",DND5eSchema);
const mongoose = require("mongoose");

const  DNDSchema = new mongoose.Schema({
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

module.exports = mongoose.model("DND",DNDSchema);
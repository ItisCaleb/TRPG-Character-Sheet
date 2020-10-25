const mongoose = require("mongoose");

const  Avatar = new mongoose.Schema({
    type:{
        type:String,
        required:true,
        max:10
    },
    image:{
        type:Buffer,
        default:''
    }
});

module.exports = mongoose.model("avatar",Avatar);

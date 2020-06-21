const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1
    },
    player_name:{
        type: String,
        max: 128
    },
    author:{
        type: String,
        required:true
    },
    system:{
        type: String,
        required:true
    },
    permission:{
        type: String,
        required:true
    },
    session:Array
});




module.exports = mongoose.model("Info",InfoSchema,'infos');


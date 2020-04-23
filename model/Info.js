const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1
    },
    player_name:String,
    author:String,
    system:String,
    permission:String,
    session:Array
});




module.exports = mongoose.model("Info",InfoSchema,'infos');


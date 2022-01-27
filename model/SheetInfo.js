const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "無名",
        max: 100
    },
    player_name:{
        type: String,
        max: 64
    },
    author:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    system:{
        type: String,
        required:true
    },
    permission:{
        type: String,
        required:true,
        default:'所有人'
    },
    session:Array
});




module.exports = mongoose.model("sheetInfo",InfoSchema,'sheetInfos');


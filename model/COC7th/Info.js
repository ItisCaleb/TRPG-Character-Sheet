const mongoose = require("mongoose");

const COC7thInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1
    },
    player_name:String,
    class:String,
    age:String,
    sex:String,
    residence: String,
    birthplace: String,
    author:String,
    skill:Array

    //stat: {type: String, required: true},
    //skill: {type: String, required: true}
});



module.exports = mongoose.model("COC7th_Info",COC7thInfoSchema);

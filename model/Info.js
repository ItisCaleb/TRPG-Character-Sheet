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
    system:String
});
/*const DND5eInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1
    },
    player_name:String,
    class:String,
    age:String,
    sex:String,
    author:String,
    system:String
});*/



module.exports = mongoose.model("COC7th_Info",COC7thInfoSchema,'infos');
//module.exports = mongoose.model("DND5e_Info",DND5eInfoSchema,'infos');

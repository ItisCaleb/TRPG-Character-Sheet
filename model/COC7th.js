const mongoose = require("mongoose");

const COC7thInfoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:1
    },
    player_name: {
        type: String,
        required:true
    },
    class:{
        type:String,
        required: true
    },
    age:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    residence:{
        type:String,
        required:true
    },
    birthplace: {
        type: String,
        required: true
    },
    author:{
        type:String,
        required:true
    },
    stat:{
        type:String,
        required:true
    },
    skill:{
        type:String,
        required:true
    }

});
const COC7thStatSchema = new mongoose.Schema({

    hp:{
        type:Array,
        required:true
    },
    san:{
        type:Array,
        required:true
    },
    mp:{
        type:Array,
        required:true
    },
    luk:{
        type:Array,
        required:true
    },
    db:Number,
    build:Number,
    mov:Number,
    insane_status:{
        type:String,
        required:true
    },
    injured_status:{
        type:String,
        required:true
    },
    str:{
        type:Number,
        required:true
    },
    con:{
        type:Number,
        required:true
    },
    dex:{
        type:Number,
        required:true
    },
    app:{
        type:Number,
        required:true
    },
    pow:{
        type:Number,
        required:true
    },
    siz:{
        type:Number,
        required:true
    },
    int:{
        type:Number,
        required:true
    },
    edu:{
        type:Number,
        required:true
    }

});
const COC7thStorySchema = new mongoose.Schema({
    description:{
        type:String,
        max:1024
    },
    belief:String,
    significant_people:String,
    meaningful_location:String,
    treasured_possession:String,
    trait:String,
    injuries:Array,
    mania:Array,
    magic:Array,
    encounter:Array,
    fellow_investigator:Array
});
const COC7thSkillSchema = new mongoose.Schema({});
const COC7thEquipSchema = new mongoose.Schema({
    equip:Array,
    cash:String,
    weapon:Array
});
module.exports = mongoose.model("COC7th_Info",COC7thInfoSchema);
module.exports = mongoose.model("COC7th_Stat",COC7thStatSchema);
module.exports = mongoose.model("COC7th_Story",COC7thStorySchema);
module.exports = mongoose.model("COC7th_Equip",COC7thEquipSchema);
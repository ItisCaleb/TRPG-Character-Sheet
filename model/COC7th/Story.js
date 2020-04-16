const mongoose = require("mongoose");
const COC7thStorySchema = new mongoose.Schema({
    class:String,
    age:String,
    sex:String,
    residence: String,
    birthplace: String,
    description:{
        type:String,
        max:1024
    },
    belief:String,
    role_description:String,
    significant_people:String,
    meaningful_location:String,
    treasured_possession:String,
    trait:String,
    myth:String,
    injuries:String,
    mania:String,
    magic:String,
    encounter:String,
    fellow_investigator:Array
});

module.exports = mongoose.model("COC7th_Story",COC7thStorySchema);
const mongoose = require("mongoose");
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

module.exports = mongoose.model("COC7th_Story",COC7thStorySchema);
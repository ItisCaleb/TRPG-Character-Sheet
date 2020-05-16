const mongoose = require("mongoose");

const  DND5eStorySchema = new mongoose.Schema({
    class:String,
    level:Number,
    background:String,
    player:String,
    race:String,
    faction:String,
    exp:String,
    personality:String,
    ideals:String,
    bonds:String,
    flaws:String,
    language:String,
    role_description: String,
    height:String,
    skin:String,
    age:String,
    weight:String,
    hair:String,
    alignment:String,
    backstory:String,
    otherTrait:String,
    treasure:String
});

module.exports = mongoose.model("DND5eStory",DND5eStorySchema);
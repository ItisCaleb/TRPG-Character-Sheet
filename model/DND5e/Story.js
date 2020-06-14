const mongoose = require("mongoose");

const DND5eStorySchema = new mongoose.Schema({
    class: String,
    level: Number,
    background: String,
    race: String,
    faction: String,
    exp: String,
    height: String,
    skin: String,
    age: String,
    weight: String,
    hair: String,
    trait:String,
    role_description: String,
    alignment: String,
    backstory: String,
    otherTrait: String,
    treasure: String,
    personality: String,
    ideals: String,
    bonds: String,
    flaws: String,
    language: String,
    avatar:Buffer
});

module.exports = mongoose.model("DND5e_Story", DND5eStorySchema);
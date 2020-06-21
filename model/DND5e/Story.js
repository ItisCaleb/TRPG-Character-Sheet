const mongoose = require("mongoose");

const DND5eStorySchema = new mongoose.Schema({
    class: {
        type: String,
        max: 40
    },
    level: {
        type: String,
        max:40
    },
    background: {
        type: String,
        max: 40
    },
    race: {
        type: String,
        max: 40
    },
    faction: {
        type: String,
        max: 40
    },
    exp: {
        type: String,
        max: 40
    },
    height: {
        type: String,
        max: 40
    },
    skin: {
        type: String,
        max: 40
    },
    age: {
        type: String,
        max: 40
    },
    weight: {
        type: String,
        max: 40
    },
    hair: {
        type: String,
        max: 40
    },
    trait:{
        type: String,
        max: 1024
    },
    role_description: {
        type: String,
        max: 1024
    },
    alignment: {
        type: String,
        max: 1024
    },
    backstory: {
        type: String,
        max: 1024
    },
    otherTrait: {
        type: String,
        max: 1024
    },
    treasure: {
        type: String,
        max: 1024
    },
    personality: {
        type: String,
        max: 1024
    },
    ideals: {
        type: String,
        max: 1024
    },
    bonds: {
        type: String,
        max: 1024
    },
    flaws: {
        type: String,
        max: 1024
    },
    language: {
        type: String,
        max: 1024
    },
    avatar:Buffer
});

module.exports = mongoose.model("DND5e_Story", DND5eStorySchema);
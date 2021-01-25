const mongoose = require("mongoose");

const DND5eStorySchema = new mongoose.Schema({
    class: {
        type: String,
        max: 20,
        default: ''
    },
    level: {
        type: String,
        max: 20,
        default: ''
    },
    background: {
        type: String,
        max: 30,
        default: ''
    },
    race: {
        type: String,
        max: 20,
        default: ''
    },
    faction: {
        type: String,
        max: 20,
        default: ''
    },
    exp: {
        type: String,
        max: 20,
        default: ''
    },
    height: {
        type: String,
        max: 20,
        default: ''
    },
    skin: {
        type: String,
        max: 20,
        default: ''
    },
    age: {
        type: String,
        max: 20,
        default: ''
    },
    weight: {
        type: String,
        max: 20,
        default: ''
    },
    hair: {
        type: String,
        max: 20,
        default: ''
    },
    pupil: {
        type: String,
        max: 20,
        default: ""
    },
    trait: {
        type: String,
        max: 1024,
        default: ''
    },
    alignment: {
        type: String,
        max: 1024,
        default: ''
    },
    backstory: {
        type: String,
        max: 1024,
        default: ''
    },
    otherTrait: {
        type: String,
        max: 1024,
        default: ''
    },
    personality: {
        type: String,
        max: 1024,
        default: ''
    },
    ideals: {
        type: String,
        max: 1024,
        default: ''
    },
    bonds: {
        type: String,
        max: 1024,
        default: ''
    },
    flaws: {
        type: String,
        max: 1024,
        default: ''
    }
});

module.exports = mongoose.model("DND5e_Story", DND5eStorySchema);

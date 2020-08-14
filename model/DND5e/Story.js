const mongoose = require("mongoose");

const DND5eStorySchema = new mongoose.Schema({
    class: {
        type: String,
        max: 40,
        default:''
    },
    level: {
        type: String,
        max:40,
        default:''
    },
    background: {
        type: String,
        max: 40,
        default:''
    },
    race: {
        type: String,
        max: 40,
        default:''
    },
    faction: {
        type: String,
        max: 40,
        default:''
    },
    exp: {
        type: String,
        max: 40,
        default:''
    },
    height: {
        type: String,
        max: 40,
        default:''
    },
    skin: {
        type: String,
        max: 40,
        default:''
    },
    age: {
        type: String,
        max: 40,
        default:''
    },
    weight: {
        type: String,
        max: 40,
        default:''
    },
    hair: {
        type: String,
        max: 40,
        default:''
    },
    trait:{
        type: String,
        max: 1024,
        default:''
    },
    role_description: {
        type: String,
        max: 1024,
        default:''
    },
    alignment: {
        type: String,
        max: 1024,
        default:''
    },
    backstory: {
        type: String,
        max: 1024,
        default:''
    },
    otherTrait: {
        type: String,
        max: 1024,
        default:''
    },
    treasure: {
        type: String,
        max: 1024,
        default:''
    },
    personality: {
        type: String,
        max: 1024,
        default:''
    },
    ideals: {
        type: String,
        max: 1024,
        default:''
    },
    bonds: {
        type: String,
        max: 1024,
        default:''
    },
    flaws: {
        type: String,
        max: 1024,
        default:''
    },
    language: {
        type: String,
        max: 1024,
        default:''
    },
    avatar:{
        type:Buffer,
        default:''
    }
});

module.exports = mongoose.model("DND5e_Story", DND5eStorySchema);
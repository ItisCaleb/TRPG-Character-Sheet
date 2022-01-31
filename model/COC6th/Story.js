const mongoose = require("mongoose");
const COC6thStorySchema = new mongoose.Schema({
    class: {
        type: String,
        max: 64,
        default: ''
    },
    age: {
        type: String,
        max: 64,
        default: ''
    },
    degree: {
        type: String,
        max: 64,
        default: ''
    },
    mental: {
        type: String,
        max: 64,
        default: ''
    },
    sex: {
        type: String,
        max: 64,
        default: ''
    },
    residence: {
        type: String,
        max: 64,
        default: ''
    },
    birthplace: {
        type: String,
        max: 64,
        default: ''
    },
    description: {
        type: String,
        max: 2048,
        default: ''
    },
    role_description: {
        type: String,
        max: 1024,
        default: ''
    },
    insanity:{
        type: String,
        max: 256,
        default: ''
    },
    family: {
        type: String,
        max: 256,
        default: ''
    },
    trait: {
        type: String,
        max: 256,
        default: ''
    },
    injuries: {
        type: String,
        max: 256,
        default: ''
    },
    scars: {
        type: String,
        max: 256,
        default: ''
    },
    tomes: {
        type: String,
        max: 256,
        default: ''
    },
    magic: {
        type: String,
        max: 256,
        default: ''
    },
    encounter: {
        type: String,
        max: 256,
        default: ''
    },
    fellow_investigator: {
        type: String,
        max: 256,
        default: ''
    },
    note: {
        type: String,
        max: 10240,
        default: ''
    }
});

module.exports = mongoose.model("COC6th_Story", COC6thStorySchema);

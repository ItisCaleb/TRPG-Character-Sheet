const mongoose = require("mongoose");
const COC7thStorySchema = new mongoose.Schema({
    class: {
        type: String,
        max: 128
    },
    age: {
        type: String,
        max: 128
    },
    sex: {
        type: String,
        max: 128
    },
    residence: {
        type: String,
        max: 128
    },
    birthplace: {
        type: String,
        max: 128
    },
    description: {
        type: String,
        max: 2048
    },
    belief: {
        type: String,
        max: 128
    },
    role_description: {
        type: String,
        max: 2048
    },
    significant_people: {
        type: String,
        max: 512
    },
    meaningful_location: {
        type: String,
        max: 512
    },
    treasured_possession: {
        type: String,
        max: 512
    },
    trait: {
        type: String,
        max: 512
    },
    myth: {
        type: String,
        max: 512
    },
    injuries: {
        type: String,
        max: 512
    },
    mania: {
        type: String,
        max: 512
    },
    magic: {
        type: String,
        max: 512
    },
    encounter: {
        type: String,
        max: 512
    },
    fellow_investigator: Array,
    avatar: {
        type: Buffer
    }
});

module.exports = mongoose.model("COC7th_Story", COC7thStorySchema);
const mongoose = require("mongoose");
const COC6thStorySchema = new mongoose.Schema({
    class: {
        type: String,
        max: 64,
        default:''
    },
    age: {
        type: String,
        max: 64,
        default:''
    },
    sex: {
        type: String,
        max: 64,
        default:''
    },
    residence: {
        type: String,
        max: 64,
        default:''
    },
    birthplace: {
        type: String,
        max: 64,
        default:''
    },
    description: {
        type: String,
        max: 2048,
        default:''
    },
    belief: {
        type: String,
        max: 256,
        default:''
    },
    role_description: {
        type: String,
        max: 1024,
        default:''
    },
    significant_people: {
        type: String,
        max: 256,
        default:''
    },
    meaningful_location: {
        type: String,
        max: 256,
        default:''
    },
    treasured_possession: {
        type: String,
        max: 256,
        default:''
    },
    trait: {
        type: String,
        max: 256,
        default:''
    },
    myth: {
        type: String,
        max: 5,
        default:"否"
    },
    injuries: {
        type: String,
        max: 256,
        default:''
    },
    mania: {
        type: String,
        max: 256,
        default:''
    },
    magic: {
        type: String,
        max: 256,
        default:''
    },
    encounter: {
        type: String,
        max: 256,
        default:''
    },
    fellow_investigator: {
        type: String,
        max:256,
        default:''
    }
});

module.exports = mongoose.model("COC6th_Story", COC6thStorySchema);

const mongoose = require("mongoose");
const COC7thStorySchema = new mongoose.Schema({
    class: {
        type: String,
        max: 128,
        default:''
    },
    age: {
        type: String,
        max: 128,
        default:''
    },
    sex: {
        type: String,
        max: 128,
        default:''
    },
    residence: {
        type: String,
        max: 128,
        default:''
    },
    birthplace: {
        type: String,
        max: 128,
        default:''
    },
    description: {
        type: String,
        max: 2048,
        default:''
    },
    belief: {
        type: String,
        max: 128,
        default:''
    },
    role_description: {
        type: String,
        max: 2048,
        default:''
    },
    significant_people: {
        type: String,
        max: 512,
        default:''
    },
    meaningful_location: {
        type: String,
        max: 512,
        default:''
    },
    treasured_possession: {
        type: String,
        max: 512,
        default:''
    },
    trait: {
        type: String,
        max: 512,
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
    fellow_investigator: Array,
    avatar: {
        type: Buffer,
        default:''
    }
});

module.exports = mongoose.model("COC7th_Story", COC7thStorySchema);

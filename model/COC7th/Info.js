const mongoose = require("mongoose");

const COC7thInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1
    },
    player_name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    residence: {
        type: String,
        required: true
    },
    birthplace: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
    //stat: {type: String, required: true},
    //skill: {type: String, required: true}
});



module.exports = mongoose.model("COC7th_Info",COC7thInfoSchema);

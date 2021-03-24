const mongoose = require("mongoose");

const COC6thStatSchema = new mongoose.Schema({
    hp: {
        type: Number,
        max: 40,
        default: 0
    },
    san: {
        type: Number,
        max: 100,
        default: 0
    },
    mp: {
        type: Number,
        max: 40,
        default: 0
    },
    characteristic: {
        type: Object,
        default: {
            str:0,
            con:0,
            dex:0,
            app:0,
            pow:0,
            siz:0,
            int:0,
            edu:0
        }
    }
});

module.exports = mongoose.model("COC6th_Stat", COC6thStatSchema);

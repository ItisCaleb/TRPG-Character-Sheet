const mongoose = require("mongoose");

const DND5eStatSchema = new mongoose.Schema({
    stat: {
        type: Object,
        default: {
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10
        }
    },
    inspiration: {
        type: Number,
        max: 50,
        default: 0
    },
    passive_wisdom: {
        type: Number,
        max: 50,
        default: 0
    },
    pro: {
        type: Number,
        max: 50,
        default: 0
    },
    armorValue: {
        type: Number,
        max: 128,
        default: 0
    },
    initiative: {
        type: Number,
        max: 50,
        default: 0
    },
    speed: {
        type: String,
        max: 100,
        default: 0
    },
    max_hp: {
        type: Number,
        max: 256,
        default: 0
    },
    hp: {
        type: Number,
        max: 256,
        default: 0
    },
    temp_hp: {
        type: Number,
        max: 100,
        default: 0
    },
    hit_dice_total: {
        type: Number,
        max: 50,
        default: 0
    },
    hit_dice: {
        type: String,
        max: 20,
        default: 0
    },
    death_save: {
        type: String,
        default: "00"
    },
    savings:{
        type: [String]
    },
    skills: {
        type: [String]
    }
});

module.exports = mongoose.model("DND5e_Stat", DND5eStatSchema);

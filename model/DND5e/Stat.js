const mongoose = require("mongoose");

const  DND5eStatSchema = new mongoose.Schema({
    stat: Array,
    inspiration:{
        type: Number,
        max: 50
    },
    passive_wisdom:{
        type: Number,
        max: 50
    },
    pro:{
        type: Number,
        max: 50
    },
    armorValue:{
        type: Number,
        max: 128
    },
    initiative:{
        type: Number,
        max: 50
    },
    speed:{
        type: Number,
        max: 100
    },
    max_hp:{
        type: Number,
        max: 256
    },
    hp:{
        type: Number,
        max: 256
    },
    temp_hp:{
        type: Number,
        max: 100
    },
    hit_dice_total:{
        type: Number,
        max: 50
    },
    hit_dice:{
        type: String,
        max: 20
    },
    death_save:[Number],
    spell_class:{
        type: String,
        max: 30
    },
    spell_ability:{
        type: String,
        max: 20
    },
    spell_save:{
        type: String,
        max: 20
    },
    spell_bonus:{
        type: String,
        max: 20
    },
});

module.exports = mongoose.model("DND5e_Stat",DND5eStatSchema);
const mongoose = require("mongoose");

const  DND5eSpellSchema = new mongoose.Schema({
    zero:Array,
    one:Array,
    two:Array,
    three:Array,
    four:Array,
    five:Array,
    six:Array,
    seven:Array,
    eight:Array,
    nine:Array

});

module.exports = mongoose.model("DND5eSpell",DND5eSpellSchema);
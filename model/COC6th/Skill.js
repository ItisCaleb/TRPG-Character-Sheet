const mongoose = require("mongoose");

const COC6thSkillSchema = new mongoose.Schema({
    skill: {
        type:Object,
        default: {}
    }
});

module.exports = mongoose.model("COC6th_Skill", COC6thSkillSchema);

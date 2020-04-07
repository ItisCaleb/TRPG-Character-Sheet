const mongoose = require("mongoose");

const COC7thSkillSchema = new mongoose.Schema({
    skill:Array
});

module.exports = mongoose.model("COC7th_Skill",COC7thSkillSchema);
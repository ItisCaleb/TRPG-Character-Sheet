const mongoose = require("mongoose");

const COC7thSkillSchema = new mongoose.Schema({
    class_feature:String,
    skill:Array
});

module.exports = mongoose.model("COC7th_Skill",COC7thSkillSchema);
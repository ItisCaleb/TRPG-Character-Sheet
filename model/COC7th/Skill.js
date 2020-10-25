const mongoose = require("mongoose");

const COC7thSkillSchema = new mongoose.Schema({
    class_feature: {
        type:String,
        max:20,
        default:'EDU'
    },
    skill: Object
});

module.exports = mongoose.model("COC7th_Skill", COC7thSkillSchema);

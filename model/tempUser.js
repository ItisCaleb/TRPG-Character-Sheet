const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 20,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    createdAt: {
        type: Date,
        index: {expires: 600},
        default: Date.now()
    }
});

module.exports = mongoose.model("tempUser", tempUserSchema);
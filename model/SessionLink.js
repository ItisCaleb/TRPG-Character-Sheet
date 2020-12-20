const mongoose = require("mongoose");

const SessionLinkSchema = new mongoose.Schema({
    code: {
        type: String,
        unique:true,
        required:true
    },
    expireAt: {
        type: Date,
        index: {expires: 86409000},
        default: Date.now()+86409000
    }
});

module.exports = mongoose.model("SessionLink", SessionLinkSchema);

const mongoose = require("mongoose");

const SessionLinkSchema = new mongoose.Schema({
    code: {
        type: String,
        unique:true,
        required:true
    },
    expireAt: {
        type: Date,
        index: {expires: 604800},
        default: Date.now()+604800
    }
});

module.exports = mongoose.model("SessionLink", SessionLinkSchema);

const mongoose = require("mongoose");

const  AnnouncementSchema = new mongoose.Schema({
    owner:{
        type:String,
        required:true,
        min:3,
        max:30
    },
    content:{
      type:String,
      required:true,
      max:1024,
      min:10
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("announcement",AnnouncementSchema);
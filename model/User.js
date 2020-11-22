const mongoose = require("mongoose");

const  userSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true,
       min:4,
       max:20,
       unique:true
   },
   email:{
       type:String,
       required:true
    },
   password:{
       type:String,
       required: true,
       min:6,
       max:15
   },
   sheet_number:{
      type:Number,
      required:true
   } ,
   date:{
       type:Date,
       default:Date.now()
   },
    admin:{
       type:Boolean,
       default: false
    }
});

module.exports = mongoose.model("User",userSchema);

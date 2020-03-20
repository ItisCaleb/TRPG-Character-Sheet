const Session = require('../../model/Session');
const User = require("../../model/User");
const jwtDecode = require('jwt-decode');
//check if user has its own session
module.exports = async function (req,res,next) {
    const gm_name = jwtDecode(req.cookies.auth_token).name;
    const gm =  await Session.find({gm: gm_name});
    if (!gm) {
        console.log(gm);
        next();
 }else{
        console.log(gm);
        next();
    }
   //else if(gm) return await Session.find({name:gm_name});

};
const Session = require('../../model/Session');
const User = require("../../model/User");
const jwtDecode = require('jwt-decode');
//check if user has its own session
module.exports = function (req,res,next) {
    const gm_name = jwtDecode(req.cookies.auth_token).name;
    const gm =  Session.findOne({name: gm_name});
    if (gm) {
        console.log('NO');
        next();
}
   //else if(gm) return await Session.find({name:gm_name});

};
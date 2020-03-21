const Session = require('../../model/Session');
const jwtDecode = require('jwt-decode');
//check if user has its own session
module.exports = async function (req,res,next) {
    const gm_name = jwtDecode(req.cookies.auth_token).name;
    const SessionFind = await Session.findOne({gm:gm_name});
    const AllSession =  await Session.findOne({gm:gm_name});
    if (!SessionFind) {
        req.app.io.emit('SessionFind','你還沒創建任何團務');
        next();
 }else{
        req.app.io.emit('SessionFind',AllSession.name);
        next();
    }
};
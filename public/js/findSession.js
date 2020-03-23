const Session = require('../../model/Session');
const jwtDecode = require('jwt-decode');
//check if user has its own session
module.exports = async function (req,res,next) {
    const gm_name = jwtDecode(req.cookies.auth_token).name;
    const SessionFind = await Session.findOne({gm:gm_name});
    const cursor =  await Session.find({ gm: {$in:[gm_name]} });

    if (!SessionFind) {
        setTimeout(function () {
            req.app.io.emit('SessionFind', '你還沒創建團務');
        }, 1000);
        next();
 }else{
        cursor.forEach(function (Session) {
            setTimeout(function () {
                req.app.io.emit('SessionFind', Session.name);
            }, 500);
        });
        next();
    }
};
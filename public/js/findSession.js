const Session = require('../../model/Session');
const jwtDecode = require('jwt-decode');
//check if user has its own session
module.exports = async function (req,res,next) {
    const user = jwtDecode(req.cookies.auth_token).name;
    const SessionFind = await Session.findOne({player:user});
    const cursor =  await Session.find({ player: {$in:[user]} });

    if (!SessionFind) {
        setTimeout(function () {
            req.app.io.emit('SessionFind', '你還沒創建團務');
        }, 1000);
        next();
 }else{
        cursor.forEach(function (Session) {
            setTimeout(function () {
                req.app.io.emit('SessionFind', Session.name +"      GM:" +Session.gm);
            }, 150);
        });
        next();
    }
};
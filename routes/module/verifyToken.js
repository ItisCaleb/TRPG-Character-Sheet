const jwt = require('jsonwebtoken');
//check if the user is using correct token
module.exports = function (req, res, next) {
    const token = req.cookies['auth_token'];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        req.data = {
            auth:true,
            user:jwt.decode(token).name
        }
        next();
    } catch (err) {
        req.data = {
            auth:false
        }
        res.clearCookie('auth_token');
        next();
    }
};

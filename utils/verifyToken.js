const jwt = require('jsonwebtoken');
//check if the user is using correct token
module.exports = function (req, res, next) {
    const token = req.cookies['auth_token'];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).send('請先登入')
    }
};

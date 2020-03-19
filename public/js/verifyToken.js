const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).cookie('ValidValue', '請先登入').redirect('/');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).cookie('ValidValue', '錯誤的憑證').redirect('/');
    }
};

const jwt = require('jsonwebtoken');

//check if the user is using correct token
module.exports = function (req, res, next) {
    const token = req.cookies.auth_token;
    if (!token) return res.redirect('/');
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).render('404');
    }
};

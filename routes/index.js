const router = require('express').Router();
const info = require('../public/info');
const jwtDecode = require('jwt-decode');
const verify = require('../public/js/verifyToken');
const findSession = require('../public/js/findSession');

//render main page
router.get("/", function (req, res) {
    res.render('index', {
        title: info.title[0],
        content: info.news
    });
});
//render create page and check if the user is already login
router.get("/create", verify, function (req, res) {
    res.render('index', {
        title: info.title[1],
        content: info.create
    });
});
//render about page
router.get("/about", function (req, res) {
    res.render('index', {
        title: info.title[2],
        content: info.info
    });
});
//render sign up page
router.get("/signup", function (req, res) {
    res.render('register');
});
//render login page
router.get("/login", function (req, res) {
    res.render('login');
});
//render user page and check if the user is already login
router.get("/user", verify, function (req, res) {
    const userinfo = jwtDecode(req.cookies.auth_token);
    res.render('user', {
        title: userinfo.name + info.title[3],
        email: userinfo.email
    });
});
router.get('/adminpost', verify, function (req, res) {
    if (jwtDecode(req.cookies.auth_token).name === process.env.ADMIN) {
        res.render('admin');
    } else {
        res.cookie('ValidValue', '非管理員憑證');
        res.redirect('/');
    }
});
router.get('/createsession',verify,function (req,res) {
    res.render('trpg_session_create');
});
router.get('/trpgsession',verify,function (req,res) {
    res.render('trpg_session', {
        title: info.title[4],
        content: 'test'
    });
});
module.exports = router;
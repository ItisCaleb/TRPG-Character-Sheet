const router = require('express').Router();
const info = require('../public/info');
const Session = require('../model/Session');
const jwtDecode = require('jwt-decode');
const verify = require('../public/js/verifyToken');


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
        res.redirect('/');
        req.app.io.emit('alert','非管理員憑證');
    }
});
router.get('/createsession',verify,function (req,res) {
    res.render('trpg_session_create');
});
router.get('/joinsession',verify,function (req,res) {
    res.render('trpg_session_join');
});
router.get('/trpgsession',verify,async function (req,res) {
    const gm_name = jwtDecode(req.cookies.auth_token).name;
    const SessionFind = await Session.findOne({gm:gm_name});
    const cursor =  await Session.find({ gm: {$in:[gm_name]} });
    const session = [];
    const gm =[];
    if (!SessionFind) {
            session.push('你還沒創建團務');
    }else {
        cursor.forEach(function (Session) {
            session.push(Session.name);
            gm.push(Session.gm);
        });
    }

    res.render('trpg_session', {
        title: info.title[4],
        content:session,
        gm:gm
    });
});



module.exports = router;
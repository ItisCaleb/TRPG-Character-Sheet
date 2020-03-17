const router = require('express').Router();
const info = require('../public/info');
const jwtDecode = require('jwt-decode');
const verify = require('../public/js/verifyToken');

//render main page
router.get("/",function (req,res) {
    res.render('index',{
        title:info.title[0],
        content:info.news
    });
});
//render create page and check if the user is already login
router.get("/create",verify,function (req,res) {
    res.render('index',{
        title:info.title[1],
        content:info.create
    });
});
//render about page
router.get("/about",function (req,res) {
    res.render('index',{
        title:info.title[2],
        content:info.info
    });
});
//render sign up page
router.get("/signup",function (req,res) {
    res.render('register');
});
//render login page
router.get("/login",function (req,res) {
    res.render('login');
});
//render user page and check if the user is already login
router.get("/user",verify,function (req,res) {
    const userinfo = jwtDecode(req.cookies.auth_token);
    res.render('user',{
        title:userinfo.name + info.title[3]
    });
});


module.exports=router;
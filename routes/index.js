const router = require('express').Router();
const info =require('../public/info');

//render main page
router.get("/",function (req,res) {
    res.render('index',{
        title:info.title[0],
        content:info.news
    });
});
//render about page
router.get("/about",function (req,res) {
    res.render('index',{
        title:info.title[1],
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


module.exports=router;
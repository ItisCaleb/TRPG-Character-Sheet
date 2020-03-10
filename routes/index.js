const router = require('express').Router();
const info =require('../info');

router.get("/",function (req,res) {
    res.render('index',{
        title:info.title[0],
        content:info.news
    });
});
router.get("/about",function (req,res) {
    res.render('index',{
        title:info.title[1],
        content:info.info
    });
});
router.get("/register",function (req,res) {
    res.render('register');
});
router.get("/login",function (req,res) {
    res.render('login');
});

module.exports=router;
const router = require('express').Router();
const info =require('../public/info');

router.get("/",function (req,res) {
    res.render('index',{
        title:"首頁",
        content:"施工中"
    });
});
router.get("/about",function (req,res) {
    res.render('index',{
        title:"關於",
        content:"這裡要放介紹"
    });
});
router.get("/register",function (req,res) {
    res.render('register');
});
router.get("/login",function (req,res) {
    res.render('login');
});

module.exports=router;
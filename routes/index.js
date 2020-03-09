const router = require('express').Router();

router.get("/",function (req,res) {
    res.render('index',{
        title:"首頁"
    });
});
router.get("/about",function (req,res) {
    res.render('index',{
        title:"關於"
    });
});

module.exports=router;
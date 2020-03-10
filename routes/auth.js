const router = require("express").Router();
const User = require("../model/User");

router.post("/register", async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    User.findOne({name: user.name}, function (err, data) {
        if (data) {
            console.log('已被註冊');
        } else {
            User.create(user, function (err, data) {
                if (err) throw err;
                console.log('註冊成功');
                res.redirect('/');
            });
        }
    });
});


module.exports=router;
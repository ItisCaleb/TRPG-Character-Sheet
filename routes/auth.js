const router = require("express").Router();
const User = require("../model/User");
const {registerValidation} = require("../validation");


//send register information to db
router.post("/register", async (req,res) => {
    //validate register infomation
    const {error}= registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user is already register
    const userExist = await User.findOne({name:req.body.name});
    const emailExist = await User.findOne({email:req.body.email});
    if (userExist) return res.status(400).redirect('/signup').res.send('此暱稱已存在');
    if (emailExist) return  res.status(400).redirect('/signup').res.send('此電子郵件已存在');
    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
        res.redirect('/login');
        res.send("註冊成功");
    }catch (err) {
        res.status(400).send(err);
    }
});


module.exports=router;
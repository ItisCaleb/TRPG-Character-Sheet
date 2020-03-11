const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require("../validation");


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

    //Hash password
    const salt = await  bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
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
//Login
router.post('/userlogin',async (req,res)=>{
    //validate login infomation
        const {error}= loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    //check if user exist
    const user = await User.findOne({email:req.body.email});
    if (!user) return  res.status(400).send('電子郵件錯誤');
    //check password
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('密碼錯誤');
    //create jwt login token
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.header('auth-token',token).send(token);
});

module.exports=router;
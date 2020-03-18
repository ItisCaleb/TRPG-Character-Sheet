const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {registerValidation,loginValidation} = require("../public/js/validation");


//send register information to db
router.post("/register", async (req,res) => {
    //validate register infomation
    const {error}= registerValidation(req.body);
    if(error) return res.status(400).cookie('ValidValue',error.details[0].message).redirect('/signup');

    //check if user is already register
    const userExist = await User.findOne({name:req.body.name});
    const emailExist = await User.findOne({email:req.body.email});
    if (userExist) return res.status(400).cookie('ValidValue','暱稱已存在').redirect('/signup');
    if (emailExist) return  res.status(400).cookie('ValidValue','電子郵件已存在').redirect('/signup');

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
        await user.save();
        res.redirect('/login');
        res.cookie('RegValue','註冊成功');
    }catch (err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/userlogin',async (req,res)=>{
    //validate login infomation
        const {error}= loginValidation(req.body);
        if(error) return res.status(400).cookie('ValidValue',error.details[0].message).redirect('/login');
    //check if user exist
    const user = await User.findOne({email:req.body.email});
    if (!user) return  res.status(400).cookie('ValidValue','電子郵件錯誤').redirect('/login');
    //check password
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).cookie('ValidValue','密碼錯誤').redirect('/login');
    //create jwt login token
    const token=jwt.sign({_id:user._id,name:user.name,email:user.email},process.env.JWT_SECRET);
    if (jwtDecode(token).name === process.env.ADMIN) res.cookie('admin','True');
    res.cookie('auth_token',token).redirect("/");
});

module.exports=router;
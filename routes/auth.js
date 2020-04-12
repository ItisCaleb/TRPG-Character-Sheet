const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {registerValidation, loginValidation, passwordValidation} = require("../public/js/validation");


//send register information to db
router.post("/register", async (req, res) => {


    //validate register infomation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user is already register
    const userExist = await User.findOne({name: req.body.name});
    const emailExist = await User.findOne({email: req.body.email});
    if (userExist) return res.status(400).send('暱稱已存在');
    if (emailExist) return res.status(400).send('電子郵件已存在');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        sheet_number:0
    });
    try {
        await user.save();
        res.send('註冊成功');
    } catch (err) {
        res.status(400).send(err).redirect('/register');
    }
});

//Login
router.post('/userlogin', async (req, res) => {



    //validate login infomation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check if user exist
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('電子郵件錯誤');
    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('密碼錯誤');
    //create jwt login token
    const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET);
    if (jwtDecode(token).name === process.env.ADMIN) res.cookie('admin', 'True');
    res.cookie('auth_token', token).send('登入成功');

});

//change password
router.post('/password', async (req,res)=>{


    const {error} = passwordValidation(req.body);
    const username=jwtDecode(req.cookies.auth_token).name;
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({name:username});
    const validPass = await bcrypt.compare(req.body.old_password,user.password);
    if (!validPass) return res.status(400).send('舊密碼錯誤');
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.new_password, salt);
    await User.updateOne({name:username},{$set:{password:hashPassword}});
    res.send('你成功修改了密碼');
});

module.exports = router;
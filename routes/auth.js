const router = require("express").Router();
const User = require("../model/User");
const tempUser = require('../model/tempUser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const {registerValidation, loginValidation, passwordValidation, findPasswordValidation} = require("./module/validation");

const pattern = new RegExp("[`~!#$^&*()=\\-|{}\':+;,\\\\\\[\\]<>\\n/?￥…—【】‘”“。、%]");


//send register information to db
router.get("/register/:id", async (req, res) => {
    //create new user
    const id = req.params.id;
    const user = await tempUser.findOne({_id: id});
    if (!user) return res.sendStatus(404);
    const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        sheet_number: 0,
    });
    try {
        //await user.save();
        await tempUser.deleteOne({_id: id});
        await newUser.save();
        res.status(200).send(newUser.email)
    } catch (err) {
        res.sendStatus(404)
    }
});


router.post('/authed', async (req, res) => {

    const mailTransport = nodeMailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        auth: {
            user: process.env.VBOT,
            pass: process.env.VPASS,
        }
    });
    //validate register infomation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    for (let key in req.body) {
        if (req.body[key].match(pattern)) {
            return res.status(400).send('你的資料含有特殊字元')
        }
    }
    //check if user is already register
    const userExist = await User.findOne({name: req.body.name});
    const emailExist = await User.findOne({email: req.body.email});
    const tempExist = await tempUser.findOne({email: req.body.email});
    if (userExist) return res.status(400).send('暱稱已存在');
    if (emailExist) return res.status(400).send('電子郵件已存在');
    if (req.body.password !== req.body.repassword) return res.status(400).send('重新輸入密碼有誤')
    if (tempExist) return res.status(400).send('你在幾分鐘前已經註冊過了!請檢查你的電子郵件')
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const temp = new tempUser({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        createdAt: Date.now()
    });
    try {
        ejs.renderFile(__dirname + '/../views/verify_email.ejs',
            {
                id: temp._id,
                content: "驗證你的電子郵件!\n同時也祝你有個美好的一天!",
            }, (err, html) => {
                const mail = {
                    from: 'TRPG Toaster <verifybot@trpgtoaster.com>',
                    to: temp.email,
                    subject: '電子郵件驗證',
                    html: html
                };
                mailTransport.sendMail(mail);
            });
        await temp.save();
        res.send('已寄出驗證電子郵件，請耐心等待');
    } catch (err) {
        res.status(400).send(err);
    }
});
//Login
router.post('/userlogin', async (req, res) => {
    //validate login infomation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check if user exist
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('電子郵件不存在');
    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('密碼錯誤');
    //create jwt login token
    const day = 86409000;
    const token = jwt.sign(
        {
            iss: 'trpgtoaster.com',
            exp: (Date.now() + (7 * day)) / 1000,
            _id: user._id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET);
    (user.admin === true && req.body.check)
        ? res.cookie('admin', 'True', {expires: new Date(Date.now() + (7 * day)), sameSite: 'lax'})
        : res.cookie('admin', 'True', {sameSite: 'lax'});
    if (req.body.check) {
        res.cookie('auth_token', token, {
            expires: new Date(Date.now() + (7 * day)),
            sameSite: 'lax'
        }).send(jwt.decode(token));
    } else {
        res.cookie('auth_token', token, {
            sameSite: 'lax',
            httpOnly: true,
            secure: false
        }).send(jwt.decode(token))
    }
});

router.get('/authVerify', (req, res) => {
    const token = req.cookies['auth_token'];
    if (!token) return res.sendStatus(401)
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.sendStatus(200)
    } catch (err) {
        res.clearCookie('auth_token').clearCookie('admin').status(403).send('cookie不合規格')
    }
})

router.get('/getUser/:name', async (req, res) => {
    const user = await User.findOne({name: req.params.name}).lean()
    if (user) {
        const data = Object.assign({},user)
        delete data.password
        return res.status(200).send(data)
    } else return res.sendStatus(404)


})

router.get('/logout', (req, res) => {
    res.clearCookie('auth_token').clearCookie('admin').send('已登出')
})

//forget password
router.post('/forget_password', async function (req, res) {
    const email = req.body.email;
    const emailExist = await User.findOne({email: email});
    const tempExist = await tempUser.findOne({email: email});
    if (!emailExist) return res.status(400).send('此電子郵件不存在');
    if (tempExist) return res.status(400).send('你已經發送了修改密碼的電子郵件，請耐心等待')
    const temp = new tempUser({
        name: email,
        email: email,
        password: email,
        createdAt: Date.now()
    });
    const mailTransport = nodeMailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        auth: {
            user: process.env.VBOT,
            pass: process.env.VPASS,
        }
    });
    try {
        ejs.renderFile(__dirname + '/../views/verify_email.ejs',
            {
                email: emailExist.email,
                content: "改密碼",
                pstatus: 'password'
            }, (err, html) => {
                const mail = {
                    from: 'TRPG Toaster <verifybot@trpgtoaster.com>',
                    to: emailExist.email,
                    subject: '修改密碼',
                    html: html
                }
                mailTransport.sendMail(mail);
            });
        await temp.save();
        res.send('已寄出找回密碼之電子郵件，請耐心等待');
    } catch (err) {
        res.status(400).send(err)
    }
});

//find password
router.post('/find_password/:email', async (req, res) => {
    const check = await tempUser({email: req.params.email});
    if (!check) return res.status(400).send('此連結已失效!');
    if (req.body.password !== req.body.repassword) return res.status(400).send('再次輸入密碼錯誤');
    const {error} = findPasswordValidation(req.body);
    for (let key in req.body) {
        if (req.body[key].match(pattern)) {
            return res.status(400).send('你的資料含有特殊字元')
        }
    }
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.params.email});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await User.updateOne({email: user.email}, {$set: {password: hashPassword}});
    await tempUser.deleteOne({email: req.params.email})
    res.send('你成功修改了密碼!');
});
//change password
router.post('/password', async (req, res) => {

    const {error} = passwordValidation(req.body);
    for (let key in req.body) {
        if (req.body[key].match(pattern)) {
            return res.status(400).send('你的資料含有特殊字元')
        }
    }
    const username = jwt.decode(req.cookies['auth_token']).name;
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({name: username});
    const validPass = await bcrypt.compare(req.body.old_password, user.password);
    if (!validPass) return res.status(400).send('舊密碼錯誤');
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.new_password, salt);
    await User.updateOne({name: username}, {$set: {password: hashPassword}});
    res.send('你成功修改了密碼!');
});


module.exports = router;

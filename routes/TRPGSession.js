const router = require('express').Router();
const Session = require('../model/Session');
const User = require("../model/User");
const jwtDecode = require('jwt-decode');
const {sessionValidation} = require("../public/js/validation");

router.post('/TRPGSession',async function (req,res) {
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).cookie('ValidValue',error.details[0].message).redirect('/createsession');
    const sessionExist = await Session.findOne({name:req.body.name});
    if (sessionExist) return res.status(400).cookie('ValidValue','此名稱已存在').redirect('/createsession');
    const gm_name = jwtDecode(req.cookies.auth_token).name;
    const gm = await User.findOne({name:gm_name});
    const session = new Session({
       name:req.body.name,
       password:req.body.password,
       gm:gm.name
    });
    try{
        await session.save();
        res.cookie('ValidValue',req.body.name + '創建成功'+' GM:'+gm_name);
        res.redirect('/trpgsession');
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
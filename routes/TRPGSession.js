const router = require('express').Router();
const Session = require('../model/Session');
const User = require("../model/User");
const jwtDecode = require('jwt-decode');
const {sessionValidation} = require("../public/js/validation");

router.post('/TRPGCreateSession',async function (req,res) {
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).redirect('/createsession'),req.app.io.emit('alert',error.details[0].message);
    const sessionExist = await Session.findOne({name:req.body.name});
    if (sessionExist) return res.status(400).redirect('/createsession'),req.app.io.emit('alert','此名稱已存在');
    const gm_name = jwtDecode(req.cookies.auth_token).name;
    const gm = await User.findOne({name:gm_name});
    const session = new Session({
       name:req.body.name,
       password:req.body.password,
       gm:gm.name,
       player:gm.name
    });
    try{
        await session.save();
        req.app.io.emit('alert',req.body.name + '創建成功'+' GM:'+gm_name);
        res.redirect('/trpgsession');
    }catch (err) {
        res.status(400).send(err);
    }
});
router.post('/TRPGJoinSession',async function (req,res) {
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert',error.details[0].message);
    const session= await Session.findOne({name:req.body.name});
    if (!session) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert','此團務不存在');
    if (req.body.password !== session.password ) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert', '密碼錯誤');
    try{
        req.app.io.emit('alert',req.body.name + '加入成功'+' GM:'+Session_name.gm);
        res.redirect('/trpgsession');
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
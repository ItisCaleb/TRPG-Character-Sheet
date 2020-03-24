const router = require('express').Router();
const Session = require('../model/Session');
const User = require("../model/User");
const jwtDecode = require('jwt-decode');
const {sessionValidation} = require("../public/js/validation");
const user = jwtDecode(req.cookies.auth_token).name;
router.post('/TRPGCreateSession',async function (req,res) {
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).redirect('/createsession'),req.app.io.emit('alert',error.details[0].message);
    const sessionExist = await Session.findOne({name:req.body.name});
    if (sessionExist) return res.status(400).redirect('/createsession'),req.app.io.emit('alert','此名稱已存在');

    const gm = await User.findOne({name:user});
    const session = new Session({
       name:req.body.name,
       password:req.body.password,
       gm:gm.name,
       player:gm.name
    });
    try{
        await session.save();
        req.app.io.emit('alert',req.body.name + '創建成功'+' GM:'+user);
        res.redirect('/trpgsession');
    }catch (err) {
        res.status(400).send(err);
    }
});
router.post('/TRPGJoinSession',async function (req,res) {
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert',error.details[0].message);
    const session= await Session.findOne({name:req.body.name});
    const playerExist = await Session.findOne({name:req.body.name,player:{$in:[user]}});
    if (!session) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert','此團務不存在');
    if (req.body.password !== session.password ) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert', '密碼錯誤');
    if (playerExist) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert','你已加入此團務');
    try{
        Session.update({name:req.body.name},{$addToSet:{player:user}});
        req.app.io.emit('alert',req.body.name + '加入成功'+' GM:'+session.gm);
        res.redirect('/trpgsession');
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
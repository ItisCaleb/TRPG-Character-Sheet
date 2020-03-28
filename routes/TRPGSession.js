const router = require('express').Router();
const Session = require('../model/Session');
const User = require("../model/User");
const jwtDecode = require('jwt-decode');
const {sessionValidation} = require("../public/js/validation");

//create a session
router.post('/TRPGCreateSession',async function (req,res) {
    //check if the format is correct
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).redirect('/createsession'),req.app.io.emit('alert',error.details[0].message);

    //check if the session is already exist
    const sessionExist = await Session.findOne({name:req.body.name});
    if (sessionExist) return res.status(400).redirect('/createsession'),req.app.io.emit('alert','此名稱已存在');

    //decode auth_token to get user information
    const user = jwtDecode(req.cookies.auth_token).name;
    //get the user information in the database
    const gm = await User.findOne({name:user});

    //create new session
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
//join a session
router.post('/TRPGJoinSession',async function (req,res) {
    //check if the format is correct
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert',error.details[0].message);

    //decode
    const user = jwtDecode(req.cookies.auth_token).name;
    const session= await Session.findOne({name:req.body.name});

    //check if the player is already in the session
    const playerExist = await Session.findOne({name:req.body.name,player:{$in:[user]}});
    //check if the session doesn't exist
    if (!session) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert','此團務不存在');
    //check the password
    if (req.body.password !== session.password ) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert', '密碼錯誤');

    if (playerExist) return res.status(400).redirect('/joinsession'),req.app.io.emit('alert','你已加入此團務');
    try{
        await Session.update({name:req.body.name},{$addToSet:{player:user}});
        req.app.io.emit('alert',req.body.name + '加入成功'+' GM:'+session.gm);
        res.redirect('/trpgsession');
    }catch (err) {
        res.status(400).send(err);
    }
});

//leave or dismiss a session if you are the gm
router.get('/delete/:id',async function (req,res) {
    const session = await Session.findOne({_id:req.params.id});
    if(session.gm === jwtDecode(req.cookies.auth_token).name){
        req.app.io.emit('alert',session.name+'已被刪除');
        await Session.deleteOne({_id:req.params.id});
        res.redirect('/trpgsession');
    }else {
        await Session.updateOne({_id:req.params.id},{$pop:{player:1}});
        req.app.io.emit('alert','已離開'+session.name);
        res.redirect('/trpgsession');
    }
});

module.exports = router;
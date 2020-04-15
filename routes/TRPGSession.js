const router = require('express').Router();
const Session = require('../model/Session');
const User = require("../model/User");
const Info = require('../model/Info')
const jwtDecode = require('jwt-decode');
const verify = require('../public/js/verifyToken');
const {sessionValidation} = require("../public/js/validation");

//create a session
router.post('/TRPGCreateSession',verify, async function (req,res) {



    //check if the format is correct
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if the session is already exist
    const sessionExist = await Session.findOne({name:req.body.name});
    if (sessionExist) return res.status(400).send('此名稱已存在');

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
        res.send(req.body.name + '創建成功'+' GM:'+user);

    }catch (err) {
        res.status(400).send(err);
    }
});
//join a session
router.post('/TRPGJoinSession',verify, async function (req,res) {

    //check if the format is correct
    const {error}= sessionValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //decode
    const user = jwtDecode(req.cookies.auth_token).name;
    const session= await Session.findOne({name:req.body.name});

    //check if the player is already in the session
    const playerExist = await Session.findOne({name:req.body.name,player:{$in:[user]}});
    //check if the session doesn't exist
    if (!session) return res.status(400).send('此團務不存在');
    //check the password
    if (req.body.password !== session.password ) return res.status(400).send('密碼錯誤');

    if (playerExist) return res.status(400).send('你已加入此團務');
    try{
        await Session.update({name:req.body.name},{$addToSet:{player:user}});
        res.send(req.body.name + '加入成功'+' GM:'+session.gm);
    }catch (err) {
        res.status(400).send(err);
    }
});

router.post('/sheet_upload/:id',verify,function (req,res) {

    const user=jwtDecode(req.cookies.auth_token).name;
    const sheet=req.body.upload
    try {
        sheet.forEach(async function (info) {
            await Session.updateOne({_id: req.params.id}, {$addToSet: {sheet: info}});
            await Info.updateOne({_id: info}, {$addToSet: {session: req.params.id}});
        })
        res.send('上傳成功');
    }catch (err) {
        res.status(404).send('上傳角卡失敗');
    }

})

//leave or dismiss a session if you are the gm
router.get('/delete/:id',verify, async function (req,res) {

    const user=jwtDecode(req.cookies.auth_token).name;
    const session = await Session.findOne({_id:req.params.id});
    const sheet = await Info.find({session:req.params.id})
    if(session.gm === user){
        for (const info of sheet) {
            await Info.updateOne({_id:info._id},{$pull:{session:req.params.id}})
        }
        await Session.deleteOne({_id:req.params.id});
        res.send(session.name+'已被解散');
    }else {
        for (const info of sheet) {
            await Info.updateOne({_id:info._id},{$pull:{session:req.params.id}})
        }
        await Session.updateOne({_id:req.params.id},{$pull:{player:user}});
        res.send('已離開'+session.name);
    }
});

module.exports = router;
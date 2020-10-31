const router = require('express').Router();
const Session = require('../model/Session');
const User = require("../model/User");
const Info = require('../model/sheetInfo');
const jwt = require('jsonwebtoken');
const verify = require('./module/verifyToken');
const {sessionValidation} = require("./module/validation");


router.get('/getSessions', async function (req, res) {
    const userName = jwt.decode(req.cookies['auth_token']).name;
    const SessionFind = await Session.findOne({player: userName});
    const cursor = await Session.find({player: {$in: [userName]}});
    if (!SessionFind) {
        res.send('你還沒創建團務')
    } else {
        const session = [];
        cursor.forEach(function (Session) {
            session.push({
                name: Session.name,
                gm: Session.gm,
                id: Session._id
            })
        });
        res.status(200).send(session)
    }
});
router.get('/getInfo/:id', async function (req, res) {
    const id = req.params.id
    const info = await Session.findOne({_id: id}).lean()
    if (!info) return res.sendStatus(404)
    const sheets = []
    const userName = jwt.decode(req.cookies['auth_token']).name;
    for (let sheet_id of info.sheet) {
        let sheet = await Info.findOne({_id: sheet_id})
        let access
        switch (sheet.permission) {
            case "限團務GM":
                access = (userName === info.gm)
                break
            default :
                access = true
        }
        sheets.push({
            id:sheet._id,
            name:sheet.name,
            system:sheet.system,
            player_name:sheet.player_name,
            access:access
        })
    }
    const data = Object.assign({}, info)
    data.sheetInfos = sheets
    if (userName !== data.gm) delete data.password
    res.status(200).send(data)
})

//create a session
router.post('/TRPGCreateSession', verify, async function (req, res) {
    //check if the format is correct
    const {error} = sessionValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if the session is already exist
    const sessionExist = await Session.findOne({name: req.body.name});
    if (sessionExist) return res.status(400).send('此名稱已存在');

    //decode auth_token to get user information
    const user = jwt.decode(req.cookies['auth_token']).name;
    //get the user information in the database
    const gm = await User.findOne({name: user});

    //create new session
    const session = new Session({
        name: req.body.name,
        password: req.body.password,
        gm: gm.name,
        player: gm.name
    });
    try {
        await session.save();
        res.send(req.body.name + '創建成功' + ' GM:' + user);

    } catch (err) {
        res.status(400).send(err);
    }
});
//join a session
router.post('/TRPGJoinSession', verify, async function (req, res) {

    //check if the format is correct
    const {error} = sessionValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //decode
    const user = jwt.decode(req.cookies['auth_token']).name;
    const session = await Session.findOne({name: req.body.name});

    //check if the player is already in the session
    const playerExist = await Session.findOne({name: req.body.name, player: {$in: [user]}});
    //if (playerExist.player.length>=16) return res.status(400).send('此團務已達15人的玩家上限')
    //check if the session doesn't exist
    if (!session) return res.status(400).send('此團務不存在');
    //check the password
    if (req.body.password !== session.password) return res.status(400).send('密碼錯誤');

    if (playerExist) return res.status(400).send('你已加入此團務');
    try {
        await Session.updateOne({name: req.body.name}, {$addToSet: {player: user}});
        res.send(req.body.name + '加入成功' + ' GM:' + session.gm);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/uploadSheet/:id', verify, async function (req, res) {

    const user = jwt.decode(req.cookies['auth_token']).name;
    const userContain = await Session.findOne({_id: req.params.id, player: user})
    if (!userContain) return res.status(401).send('你無法權限上傳角色卡')
    const sheet = req.body;
    try {
        if (sheet === undefined) {
            return res.status(400).send('請選擇角卡上傳');
        }
        for (let index in sheet) {
            await Info.updateOne({_id: sheet[index]}, {$addToSet: {session: req.params.id}});
            await Session.updateOne({_id: req.params.id}, {$addToSet: {sheet: sheet[index]}});
        }
        res.send('上傳成功');
    } catch (err) {
        console.log(err)
        res.status(400).send('上傳角卡失敗');
    }
});
router.delete('/sheetdelete/:id', verify, async function (req, res) {
    const user = jwt.decode(req.cookies['auth_token']);
    const sheet = req.params.id;
    const session = req.query.session;
    const sheetOwn = await Info.findOne({_id: sheet, author: user._id});
    if (!sheetOwn) return res.status(400).send('這不是你的角色卡!');
    if (!session) return res.status(400).send('URL的值無效')
    try {
        await Session.updateOne({_id: session}, {$pull: {sheet: sheetOwn._id}});
        await Info.updateOne({_id: sheet, author: user._id}, {$pull: {session: session}});
        res.send('已取消上傳的角色卡');
    } catch (err) {
        res.status(400).send(err)
    }
})
router.get('/playerdelete/:id', verify, async function (req, res) {
    //get current user
    const user = jwt.decode(req.cookies['auth_token']);
    //check if the user is gm
    //get delete player
    const player = req.params.id;
    //get current session
    const session = req.query.session;
    const gm = await Session.findOne({_id: session, gm: user.name});
    if (!gm) return res.status(400).send('你並無權限剔除人');
    if (!session) return res.status(400).send('URL的值無效')

    //find player's information
    const player_user = await User.findOne({name: player})
    //find player's sheet in the session
    const user_sheet = await Info.find({session: {$elemMatch: {$in: [session]}}, author: player_user._id});
    try {
        for (const info of user_sheet) {
            await Info.updateOne({_id: info._id, author: player_user._id}, {$pull: {session: session}});
            await Session.updateOne({_id: session}, {$pull: {sheet: info._id}});
        }
        await Session.updateOne({_id: session}, {$pull: {player: player}});
        res.send('已將' + player + '剔除');
    } catch (err) {
        res.status(400).send(err)
    }
})


//leave or dismiss a session if you are the gm
router.delete('/deleteSession/:id', verify, async function (req, res) {
    const user = jwt.decode(req.cookies['auth_token']);
    const session = await Session.findOne({_id: req.params.id});
    const sheet = await Info.find({session: {$elemMatch: {$in: [req.params.id]}}});
    const user_sheet = await Info.find({session: {$elemMatch: {$in: [req.params.id]}}, author: user._id});
    if (session.gm === user.name) {
        for (const info of sheet) {
            await Info.updateOne({_id: info._id}, {$pull: {session: req.params.id}})
        }
        await Session.deleteOne({_id: req.params.id});
        res.send(session.name + '已被解散');
    } else {
        for (const info of user_sheet) {
            await Info.updateOne({_id: info._id, author: user._id}, {$pull: {session: req.params.id}});
            await Session.updateOne({_id: req.params.id}, {$pull: {sheet: info._id}});
        }
        await Session.updateOne({_id: req.params.id}, {$pull: {player: user.name}});
        res.send('已離開' + session.name);
    }
});

module.exports = router;

const router = require('express').Router();
const Session = require('../model/Session');
const mongoose = require('mongoose')
const User = require("../model/User");
const Info = require('../model/SheetInfo');
const SessionLink = require('../model/SessionLink')
const verify = require('../utils/verifyToken');
const {sessionValidation} = require("../utils/validation");
const {CharacterSheet} = require("../model/CharacterSheet");

// Get User's Sessions
router.get('/getSessions', verify, async function (req, res) {
    const player = req.token;
    const SessionFind = await Session.findOne({player: player.name});
    if (!SessionFind) {
        res.send('你還沒創建團務')
    } else {
        const cursor = await Session.find({player: {$in: [player.name]}});
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


//Get Session's Info
router.get('/getInfo/:id', verify, async function (req, res) {
    const id = req.params.id
    try {
        const info = await Session.findById({_id: id}).lean()
        if (!info) return res.sendStatus(404)
        const sheets = {}
        const player = req.token;
        if (!info.player.includes(player.name)) return res.status(403).send("你不是這團務的成員")
        // Get member's sheets
        for (let user in info.sheet) {
            sheets[user] = []
            // Check for every sheet's permission
            for(let id of info.sheet[user]){
                const memberSheet = await new CharacterSheet().init(id,player)
                if(memberSheet.checkOwn() || await memberSheet.checkView(info)){
                    let sheet = await memberSheet.exec("stat")
                    sheets[user].push(Object.assign({
                        access:true
                    },sheet))
                }else {
                    sheets[user].push({
                        access: false,
                        info: memberSheet.info
                    })
                }
            }
        }
        info.sheets = sheets
        const link = await SessionLink.findById({_id: info._id})
        info.code = (link) ? link.code : ""
        res.status(200).send(info)
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
})

//create invite link
router.get('/createInvite/:id', async function (req, res) {
    const codeExist = await SessionLink.findById({_id: req.params.id})
    if (codeExist) return res.sendStatus(400)
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //get random code
    const code = Array(9).join().split(',').map(function () {
        return charSet.charAt(Math.floor(Math.random() * charSet.length));
    }).join('');
    const link = new SessionLink({
        _id: req.params.id,
        code: code
    })
    await link.save();
    res.send(code)
})
//create a session
router.post('/createSession', verify, async function (req, res) {
    //check if the format is correct
    const {error} = sessionValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if the session is already exist
    const sessionExist = await Session.findOne({name: req.body.name});
    if (sessionExist) return res.status(400).send('此名稱已存在');

    //decode auth_token to get user information
    const user = req.token.name;
    //get the user information in the database
    const gm = await User.findOne({name: user});

    //create new session
    const session = new Session({
        name: req.body.name,
        gm: gm.name,
        player: gm.name,
        sheet: {
            [gm.name]: []
        }
    });
    try {
        await session.save();
        res.send(req.body.name + '創建成功' + ' GM:' + user);

    } catch (err) {
        res.status(400).send(err);
    }
});
//join a session
router.get('/joinSession', verify, async function (req, res) {

    //decode
    const user = req.token.name;
    const invite = await SessionLink.findOne({code: req.query.code})
    if (!invite) return res.status(400).send("此邀請碼無效或是過時");
    const session = await Session.findById({_id: invite._id});
    //check if the player is already in the session
    if (session.player.includes(user)) return res.send({
        session: session._id,
        player: user
    })
    try {
        //add player and set it to map
        await Session.updateOne({_id: invite._id}, {$addToSet: {player: user}, $set:{["sheet."+user]:[]}});
        res.send({
            session: session._id,
            player: user
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/uploadSheet/:id', verify, async function (req, res) {
    const name = req.token.name
    const session = await Session.findOne({_id: req.params.id, player: name})
    if (!session) return res.status(401).send('你無權限上傳角色卡')
    const sheet = req.body;
    try {
        if (!Array.isArray(sheet)) {
            return res.status(400).send('請選擇角卡上傳');
        }
        let set = new Set(session.sheet.get(name))
        for (let index in sheet) {
            const info = await Info.findOneAndUpdate({_id: sheet[index], author: req.token._id}, {$addToSet: {session: req.params.id}});
            if(info) set.add(sheet[index])
        }
        await Session.updateOne({_id: req.params.id}, {[`sheet.${[name]}`]: [...set]});
        res.send('上傳成功');

    } catch (err) {
        console.log(err)
        res.status(400).send('上傳角卡失敗');
    }
});
router.delete('/removeSheet/:id', verify, async function (req, res) {
    const user = req.token;
    const sheet = req.params.id;
    const session = req.query.session;
    if (!session) return res.status(400).send('URL的值無效')
    const sheetOwn = await Info.findOne({_id: sheet, author: user._id});
    if (!sheetOwn) return res.status(400).send('這不是你的角色卡!');
    try {
        await Session.updateOne({_id: session}, {$pull: {[`sheet.${user.name}`]: sheetOwn._id.toString()}})
        res.send('已取消上傳的角色卡');
        await Info.updateOne({_id: sheet, author: user._id}, {$pull: {session: session}});
    } catch (err) {
        console.log(err)
        res.status(400)
    }
})
router.get('/playerDelete/:id', verify, async function (req, res) {
    //get current user
    const user = req.token;
    //get delete player
    const player = req.params.id;
    //get current session
    const session = req.query.session;
    if (!session) return res.status(400).send('URL的值無效')
    //check if user is gm and player is in session
    const check = await Session.findOne({_id: session, gm: user.name, player: player});
    if (!check) return res.status(400).send('無效');

    const player_user = await User.findOne({name: player})
    try {
        await Session.updateOne({_id: session}, {$pull: {player: player_user.name}, sheet: {$unset: player_user.name}});
        res.send('已將' + player + '剔除');
        await Info.updateMany({session: {$elemMatch: {$in: [session]}}, author: player_user._id},{$pull:{session:session}});
    } catch (err) {
        res.status(400).send(err)
    }
})


//leave or dismiss a session if you are the gm
router.delete('/deleteSession/:id', verify, async function (req, res) {
    const user = req.token;
    const session = await Session.findById({_id: req.params.id});
    const sheet = await Info.find({session: {$elemMatch: {$in: [req.params.id]}}});
    const user_sheet = await Info.find({session: {$elemMatch: {$in: [req.params.id]}}, author: user._id});
    if (session.gm === user.name) {
        for (const info of sheet) {
            await Info.updateOne({_id: info._id}, {$pull: {session: req.params.id}})
        }
        await Session.deleteOne({_id: req.params.id});
        await SessionLink.deleteOne({_id:req.params.id})
        res.send(session.name + '已被解散');
    } else {
        for (const info of user_sheet) {
            await Info.updateOne({_id: info._id, author: user._id}, {$pull: {session: req.params.id}});
        }
        await Session.updateOne({_id: req.params.id}, {
            $pull: {player: user.name},
            $unset: {[`sheet.${user.name}`]: ""}
        });
        res.send('已離開' + session.name);
    }
});

module.exports = router;

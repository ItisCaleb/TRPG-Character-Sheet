const router = require('express').Router();
const info = require('../public/info');
const Session = require('../model/Session');
const Sheet = require('../model/Info');
//decode auth_token
const jwtDecode = require('jwt-decode');
//verify if auth_token is correct and user is logged in
const verify = require('../public/js/verifyToken');


//render main page
router.get("/", function (req, res) {
    res.render('index', {
        title: info.title[0],
        content: info.news
    });
});

//render create page and check if the user is already login
router.get("/create", verify, function (req, res) {
    res.render('edit_character_sheet', {
        title: info.title[1],
        content: info.create
    });
});

//render about page
router.get("/about", function (req, res) {
    res.render('index', {
        title: info.title[2],
        content: info.info
    });
});

//render sign up page
router.get("/signup", function (req, res) {
    res.render('register');
});

//render login page
router.get("/login", function (req, res) {
    res.render('login');
});

//render user page and check if the user is already login
router.get("/user", verify, function (req, res) {
    const userinfo = jwtDecode(req.cookies.auth_token);
    res.render('user', {
        title: userinfo.name + info.title[3],
        email: userinfo.email
    });
});

//render adminpost page
router.get('/adminpost', verify, function (req, res) {
    if (jwtDecode(req.cookies.auth_token).name === process.env.ADMIN) {
        res.render('admin');
    } else {
        res.redirect('/');
        req.app.io.emit('alert','非管理員憑證');
    }
});

//render session page
router.get('/trpgsession',verify,async function (req,res) {
    const name = jwtDecode(req.cookies.auth_token).name;
    const SessionFind = await Session.findOne({player:name});
    const cursor =  await Session.find({ player: {$in:[name]} });
    const session = {name:[],gm:[],url:[]};
    if (!SessionFind) {
        session.name.push('你還沒創建團務');
    }else {
        cursor.forEach(function (Session) {
            session.name.push(Session.name);
            session.gm.push(Session.gm);
            session.url.push(Session._id)
        });
    }

    res.render('trpg_session', {
        title: info.title[4],
        content:session.name,
        gm:session.gm,
        url:session.url
    });
});


//render the specific session page
router.get('/trpgsession/:id',verify, async function (req,res) {
    const url=req.params.id;
    //render session join page
    if (url === 'join') return res.render('trpg_session_join');
    //render session create page
    else if (url === 'create') return res.render('trpg_session_create');
    else {
        try {
            const session = await Session.findOne({_id: url});
            const dismiss = {option: '', url: url};
            if (session.gm === jwtDecode(req.cookies.auth_token).name)
                dismiss.option = '解散';
            else
                dismiss.option = '離開';
            res.render('trpg_session_show', {
                title: '團務名稱：' + session.name,
                content: session.player,
                dismiss: dismiss.option,
                url: dismiss.url
            })
        } catch (err) {
            res.status(404).render('404')

        }
    }
});

router.get('/charactersheet',verify,async function (req,res) {
    const id = jwtDecode(req.cookies.auth_token)._id;
    const SheetFind = await Sheet.findOne({author:id});
    const cursor =  await Sheet.find({author: {$in:[id]} });
    const sheet={name:[],system:[],url:[]};
    if (!SheetFind) {
        sheet.name.push('你還沒創建角卡');
    }else {
        cursor.forEach(function (Sheet) {
            sheet.name.push(Sheet.name);
            sheet.system.push(Sheet.system);
            sheet.url.push(Sheet._id)
        });
    }
    res.render('trpg_sheet',{
        title:info.title[5],
        content:sheet.name,
        system:sheet.system,
        url:sheet.url
    });
});
router.get('/charactersheet/:id',verify,async function (req,res) {
    const url = req.params.id;
    const SheetFind = await Sheet.findOne({_id:url});
    if(url==='create') {
        res.render('COC7th_create', {
            title: '創建角色卡',
            content: '創建你的角色卡',
            player: jwtDecode(req.cookies.auth_token).name
        });
    }
    if (SheetFind.system==="COC7th"){
        res.render('COC7th_show',{
            title:'編輯角色卡',
            content:'編輯你的角色卡',
            player:jwtDecode(req.cookies.auth_token).name
        })
    }
    });

module.exports = router;
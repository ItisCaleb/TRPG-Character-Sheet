const router = require('express').Router();
const info = require('../public/info');
const Session = require('../model/Session');
const Sheet = require('../model/Info');
const User = require('../model/User');
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
    res.render('about', {
        title: info.title[2],
        content: info.info
    });
});

//render sign up page
router.get("/signup", function (req, res) {
    const token = req.cookies.auth_token;
    if (token) return res.redirect('/');
    res.render('register');
});

//render login page
router.get("/login", function (req, res) {
    const token = req.cookies.auth_token;
    if (token) return res.redirect('/');
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
        res.status(400).render('404');
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
    const username=jwtDecode(req.cookies.auth_token);
    const url=req.params.id;
    const UserSheet={name:[],system:[],sheet_id:[],status:''};
    const SessionSheet={name:[],system:[],sheet_id:[],player:[],status:''};
    //render session join page
    if (url === 'join') return res.render('trpg_session_join');
    //render session create page
    if (url === 'create') return res.render('trpg_session_create');
    if (url !=='join'|| url !== 'create') {
        try {

            //find current session
            const session = await Session.findOne({_id: url});

            //find current user info
            const user = await User.findOne({name:username.name});
            const userExist = await Session.findOne({player:{$elemMatch:{$in:[username.name]}},_id:url});
            if(!userExist) return res.status(404).render('404');
            //check if user has sheet
            if (user.sheet_number>=1) {

                //find all the sheet that user has
                const sheets = await Sheet.find({author:user._id});

                //check if the sheets are already upload to the session
                for (const info of sheets) {
                    var sheetExist = await Session.findOne({sheet:{$elemMatch:{$in:[info._id]}}});

                    //if not, show those sheet that doesn't upload to the session
                    if (!sheetExist) {
                        UserSheet.name.push(info.name);
                        UserSheet.system.push(info.system);
                        UserSheet.sheet_id.push(info._id);
                    }
                }

                //check if the user had already upload all the sheet
                if(UserSheet.name.length===0) {
                    UserSheet.status = '你擁有的角卡都已上傳';
                }
            }else{
                UserSheet.status = '你還未擁有任何角色卡';
            }

            //check if the session has any sheet on it
            if (session.sheet.length>=1){
                for (const data of session.sheet) {
                    var sheet = await Sheet.findOne({_id:data});
                    var player = await User.findOne({_id:sheet.author});
                    SessionSheet.name.push(sheet.name);
                    SessionSheet.system.push(sheet.system);
                    SessionSheet.sheet_id.push(sheet._id);
                    SessionSheet.player.push(player.name);
                }
            }else{
                SessionSheet.status='看來還沒有人上傳角卡'
            }
            const dismiss = {option: '', url: url};
            if (session.gm === username.name)
                dismiss.option = '解散';
            else
                dismiss.option = '離開';
            res.render('trpg_session_show', {
                title: '團務名稱：' + session.name,
                content: session.player,
                password:session.password,
                dismiss: dismiss.option,
                url: dismiss.url,
                user_sheet_name:UserSheet.name,
                user_system:UserSheet.system,
                user_sheet_id:UserSheet.sheet_id,
                user_status:UserSheet.status,
                session_sheet_name:SessionSheet.name,
                session_system:SessionSheet.system,
                session_sheet_id:SessionSheet.sheet_id,
                session_status:SessionSheet.status,
                session_sheet_player:SessionSheet.player
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
    res.render('trpg_sheet ',{
        title:info.title[5],
        content:sheet.name,
        system:sheet.system,
        url:sheet.url
    });
});
router.get('/charactersheet/create/:id',verify,async function (req,res) {
    const user = jwtDecode(req.cookies.auth_token);

    const sheetNumber = await User.findOne({_id: user._id});
        if (sheetNumber.sheet_number < 20) {
            res.status(200);
            if (req.params.id === 'COC7th') {
                res.render('COC7th_create', {
                    title: '創建角色卡',
                    content: '創建你的角色卡',
                    player: user.name
                });
            } else {
                res.render('404');
            }

        } else res.status(400).send('你的角色卡已經達到上限');

});

router.get('/charactersheet/:id',verify,async function (req,res) {
        try{
            const sheet = await Sheet.findOne({_id:req.params.id});
            if (sheet.system==="COC7th"){
                if(sheet.author===user._id) {
                    res.render('COC7th_edit', {
                        title: '編輯角色卡',
                        id: req.params.id
                    });
                }
                if(sheet.author!==user._id){
                    res.render('COC7th_show',{
                        title:'檢視角色卡',
                        id:req.params.id
                    })
                }
            }
        }catch (err) {
            res.status(404).render('404');
        }

});


module.exports = router;
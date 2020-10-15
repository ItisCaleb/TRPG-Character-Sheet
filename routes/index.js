const router = require('express').Router();
const Session = require('../model/Session');
const Sheet = require('../model/Info');
const User = require('../model/User');
const tempUser=require('../model/tempUser');
const announcement = require('../model/announcement');
//decode auth_token
const jwt = require('jsonwebtoken');
//verify if auth_token is correct and user is logged in
const verify = require('./module/verifyToken');
const sheetJSON = require('./module/sheetJSON');


router.get('/find_password/:email',async function (req,res) {
    const findExpire= await tempUser.findOne({email:req.params.email});
    if(!findExpire) return res.render('find_password', {
        title: '你的修改密碼已經逾時或是失效!',
        content: '這個網址已經失效\r\n如只是逾時請再請求發送電子郵件',
        email:'',
        pstatus:'false',
        authData:req.data
    });
    res.render('find_password', {
        title: '修改密碼',
        content: '',
        email:findExpire.email,
        pstatus:'true',
        authData:req.data
    });

})


//post things
/*router.post('/admin/post', verify,async function (req, res) {
    const user = jwt.decode(req.cookies['auth_token']);
    const admin = await User.findOne({_id:user._id})

    if (admin.admin===true) {
        try {
            const announce = new announcement({
                owner:user.name,
                content:req.body.content
            })
            await announce.save();
            res.send('你成功發出了公告!')
        }catch (e) {
            res.status(400).send('字數太少!');
        }

    } else {
        res.status(400).send('你沒有權限')
    }
});*/


//render session page



//render the specific session page
router.get('/trpgsession/:id', async function (req,res) {
    if(req.data.auth === false ) return res.redirect('/');
    const username=jwt.decode(req.cookies['auth_token']);
    const url=req.params.id;
    const UserSheet={name:[],system:[],sheet_id:[],status:''};
    const SessionSheet={name:[],system:[],sheet_id:[],player:[],status:'',access:[]};
    //render session join page
    if (url === 'join') return res.render('trpg_session_join', {
        authData:req.data
    });
    //render session create page
    if (url === 'create') return res.render('trpg_session_create',{
        authData:req.data
    });
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
                    var sheetExist = await Session.findOne({sheet:{$elemMatch:{$in:[info._id]}},_id:url});
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
                    (player.name===user.name) ? SessionSheet.access.push('yes') :SessionSheet.access.push('no');
                }
            }else{
                SessionSheet.status='看來還沒有人上傳角卡'
            }
            const dismiss = {option: '', url: url};
            var pword='none';
            if (session.gm === username.name) {
                dismiss.option = '解散';
                pword = session.password;
            }
            else
                dismiss.option = '離開';

            res.render('trpg_session_show', {
                title: '團務名稱：' + session.name,
                player: session.player,
                password:pword,
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
                session_sheet_player:SessionSheet.player,
                session_sheet_access:SessionSheet.access,
                authData:req.data
            })
        } catch (err) {
            res.status(404).render('404')

        }
    }
});



router.get('/charactersheet/:id',async function (req,res) {
    if(req.data.auth === false ) return res.redirect('/');
    const user = jwt.decode(req.cookies['auth_token']);
        try{
            const sheet = await Sheet.findOne({_id:req.params.id});
            var sheetData;
            await sheetJSON(sheet.system,req.params.id)
                .then(function (data) {
                    sheetData=data;
                })
                .catch(function (err) {
                    console.log(err);
                    return res.status(404).render('404');
                });
            if(sheet.author===user._id) {
                res.render(sheet.system+'_edit', {
                    title: '編輯角色卡',
                    id: req.params.id,
                    status: "edit",
                    data:sheetData,
                    authData:req.data
                });
            }
            if(sheet.author!==user._id){
                if(sheet.permission==='限團務GM' && sheet.session.length !==0){
                    for (const session of sheet.session){
                        var gm = await Session.findOne({_id:session,gm:user.name});
                        if (gm) return res.render(sheet.system+'_show', {
                            title: '檢視角色卡',
                            id: req.params.id,
                            status:"view",
                            data:sheetData,
                            authData:req.data
                        });
                    }res.redirect('/charactersheet');
                }
                if(sheet.permission==='團務所有玩家' && sheet.session.length !==0){
                    for (const session of sheet.session){
                        var player = await Session.findOne({_id:session,player:{$elemMatch:{$in:[user.name]}}})
                        if (player) return res.render(sheet.system+'_show', {
                            title: '檢視角色卡',
                            id: req.params.id,
                            status:"view",
                            data:sheetData,
                            authData:req.data
                        });
                    } res.redirect('/charactersheet');
                }
                if(sheet.permission==='所有人'){
                    res.render(sheet.system+'_show',{
                        title:'檢視角色卡',
                        id:req.params.id,
                        status:"view",
                        data:sheetData,
                        authData:req.data
                    });
                }
            }
        }catch (err) {
            console.log(err);
            res.status(404).render('404');
        }
});


module.exports = router;

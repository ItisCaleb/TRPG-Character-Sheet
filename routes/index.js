const router = require('express').Router();
const tempUser = require('../model/tempUser');
const COC7thStory = require('../model/COC7th/Story')

router.get('/', async (req, res) => {
    const sheets = await COC7thStory.find()
    for (let i in sheets) {
        sheets[i].set('avatar',undefined, {strict: false})
    }
    res.send('test')
})

router.get('/find_password/:email', async function (req, res) {
    const findExpire = await tempUser.findOne({email: req.params.email});
    if (!findExpire) return res.render('find_password', {
        title: '你的修改密碼已經逾時或是失效!',
        content: '這個網址已經失效\r\n如只是逾時請再請求發送電子郵件',
        email: '',
        pstatus: 'false',
        authData: req.data
    });
    res.render('find_password', {
        title: '修改密碼',
        content: '',
        email: findExpire.email,
        pstatus: 'true',
        authData: req.data
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


module.exports = router;

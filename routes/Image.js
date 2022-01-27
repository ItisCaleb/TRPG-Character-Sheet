const multer = require("multer");
const router = require('express').Router();
const Avatar = require('../model/Avatar');
const verify = require('../utils/verifyToken');
// image filter middleware
const upload = multer({
    limits:{
        fileSize:1000000
    }
});



router.get('/getImage/:type/:id',async (req,res)=>{
    const type = req.params.type;
    const id = req.params.id;
    try {
        const avatar = await Avatar.findById({_id:id,type:type}).lean()
        if(!avatar.image) return res.send("")
        res.send(Buffer.from(avatar.image.buffer.toString('base64')));
    }catch {
        res.send("")
    }

})
router.post('/uploadImage/:type/:id',verify,upload.single('file'),verify,async function (req,res) {
    const type = req.params.type;
    const image = (req.file) ?req.file.buffer:'';
    await Avatar.updateOne({_id:req.params.id,type:type},{
        image:image
    })
    res.sendStatus(200);
});



router.get('/removeImage/:type/:id',verify,async (req, res) => {
    const type = req.params.type;
    await Avatar.updateOne({_id:req.params.id,type:type},{
        image:""
    })
    res.sendStatus(200);
})
router.use((err,req,res,next)=>{
    if(err.code === 'LIMIT_FILE_SIZE'){
        return res.status(400).send('你的圖片太大了!上限是800kb')
    }
})

module.exports=router

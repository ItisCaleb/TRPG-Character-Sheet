const multer = require("multer");
const router = require('express').Router();
const Avatar = require('../model/Avatar');
const verify = require('./module/verifyToken');
// image filter middleware
const upload = multer({
    limit:{
        fileSize:500000
    },
    fileFilter(req,file,cb){
        console.log(file.originalname);
        cb(null,true);
    }
});

router.get('/getImage/:type/:id',async (req,res)=>{
    const type = req.params.type;
    const id = req.params.id;
    try {
        const avatar = await Avatar.findOne({_id:id,type:type}).lean()
        if(!avatar.image) return res.send("")
        res.send(Buffer.from(avatar.image.buffer.toString('base64')));
    }catch {
        res.send("")
    }

})
router.post('/uploadImage/:type/:id',upload.single('file'),verify,async function (req,res) {
    const type = req.params.type;
    const image = (req.file) ?req.file.buffer:'';
    await Avatar.updateOne({_id:req.params.id,type:type},{
        image:image
    })
    res.sendStatus(200);
});
router.get('/removeImage/:type/:id',async (req, res) => {
    const type = req.params.type;
    await Avatar.updateOne({_id:req.params.id,type:type},{
        image:""
    })
    res.sendStatus(200);
})

module.exports=router

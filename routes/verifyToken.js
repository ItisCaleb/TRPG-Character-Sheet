const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token=req.header('auth-token');
    if(!token) return res.status(401).send('拒絕登入');
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch (err) {
        res.status(400).send('錯誤的憑證')

    }
}

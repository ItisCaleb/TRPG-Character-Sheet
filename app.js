const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require('fs');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http =require('http');
const https = require('https');


//import routes
const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const TRPGSessionRoute = require('./routes/TRPGSession');
const sheetDeleteRoute = require('./routes/sheetDelete');
const COC7thSheetRoute = require('./routes/COC7thsheet');
const DND5eSheetRoute = require('./routes/DND5esheet');


//set view engine

app.engine('ejs',require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
dotenv.config();


// connect Database
mongoose.connect(process.env.DB_CONNECT || " mongodb://127.0.0.1:27017/test?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(function (res) {
        console.log('DB started');
    })
    .catch(function (err) {
        console.log(err)
    });


// middleware
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// route middleware
app.use('/', indexRoute);
app.use("/api/user", authRoute);
app.use('/api/session', TRPGSessionRoute);
app.use('/api/sheet',sheetDeleteRoute);
app.use('/api/sheet',COC7thSheetRoute);
app.use('/api/sheet',DND5eSheetRoute);

const privateKey = fs.readFileSync(__dirname+'/public/ssl/private.key');
const certificate = fs.readFileSync(__dirname+'/public/ssl/certificate.crt');

const credentials ={key:privateKey, cert:certificate};

app.use(function (req, res, next) {
    next(res.createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('404');
});


// start server
const port = process.env.PORT || 3000;
const server = https.createServer(credentials,app);



server.listen(port,() => console.log('HTTPS start on port:' + port));
const io = require('socket.io').listen(server);
io.sockets.on('connect',(socket)=>{
   require('./routes/module/asyncEdit')(socket);
});


// Secondary http app
const httpApp = express();
const httpRouter = express.Router();
httpApp.use('/', httpRouter);
const host = process.env.HOST || '192.168.0.107:3001';
httpRouter.get('/', function(req, res){
    // determine the redirect destination
    var destination = ['https://'+ host + req.url];
    return res.redirect(destination);
});
const httpServer = http.createServer(httpApp);
httpServer.listen(3001,() => console.log('HTTP start on port:' + 3001));


const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require('fs');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http =require('http')
const https = require('https');


//import routes
const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const TRPGSessionRoute = require('./routes/TRPGSession');
const sheetRoute = require('./routes/sheet');


//set view engine
app.set('view engine', 'ejs');
dotenv.config();


// connect Database
mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("DB Started"));


// middleware
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// route middleware
app.use("/api/user", authRoute);
app.use('/api/session', TRPGSessionRoute);
app.use('/', indexRoute);
app.use('/api/sheet',sheetRoute);

const privateKey = fs.readFileSync(__dirname+'/public/ssl/private.key');
const certificate = fs.readFileSync(__dirname+'/public/ssl/certificate.crt');

const credentials ={key:privateKey, cert:certificate};

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('404');
});


// start server
const port = process.env.PORT || 3000;
const server = https.createServer(credentials,app)

server.listen(port,() => console.log('Server start on port:' + port));

// Secondary http app
const httpApp = express();
const httpRouter = express.Router();
httpApp.use('/', httpRouter);
httpRouter.get('/', function(req, res){
    var host = req.get('Host');
    // replace the port in the host
    host = host.replace(/:\d+$/, ":"+port);

    // determine the redirect destination
    var destination = ['https://', host, req.url].join('');
    return res.redirect(destination);
});
const httpServer = http.createServer(httpApp);
httpServer.listen(3001,() => console.log('Server start on port:' + 3001));
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require('http').createServer(app);
const io = require("socket.io")(http);
app.io = io;
//share socket.io to other modules

//import routes
const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const TRPGSessionRoute = require('./routes/TRPGSession');
const sheetRoute = require('./routes/sheet');

const vhost = require('./node_modules/vhost');


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
app.use('/api', TRPGSessionRoute);
app.use('/', indexRoute);
app.use('/api/sheet',sheetRoute);

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

//start socket.io connection
io.sockets.setMaxListeners(0);
io.on('connection', function (socket) {
    socket.send(socket.id);
});

// start server
const port = process.env.PORT || 3000;
http.listen(port, () => console.log("Server Start on port:" + port));


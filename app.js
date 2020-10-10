const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require('http');
const cors = require('cors');
const path = require('path')

//import routes
const authRoute = require("./routes/auth");
const TRPGSessionRoute = require('./routes/TRPGSession');
const sheetDeleteRoute = require('./routes/sheetDelete');
const COC7thSheetRoute = require('./routes/COC7thsheet');
const DND5eSheetRoute = require('./routes/DND5esheet');


//set view engine

dotenv.config();
app.set('view engine', 'ejs');

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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const corsOptions ={
    origin:[
        'http://localhost:8080',
        'http://localhost:3000',
        'https://trpgtoaster.com'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
// route middleware
const history = require('connect-history-api-fallback');
app.use(express.static(path.join(__dirname,'dist')))
app.use(history())
app.use("/api/user", authRoute);
app.use('/api/session', TRPGSessionRoute);
app.use('/api/sheet',sheetDeleteRoute);
app.use('/api/sheet',COC7thSheetRoute);
app.use('/api/sheet',DND5eSheetRoute);

app.use(function (req, res, next) {
    next(res.createError(404));
});

// error handler
app.use(require('./routes/module/verifyToken'),function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.sendStatus(404)
});


// start server
const port = process.env.PORT || 3000;
const server = http.createServer(app)

server.listen(port,() => console.log('HTTP start on port:' + port));


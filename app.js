const express = require("express");
const app = express();
const dotenv =  require("dotenv");
const mongoose = require("mongoose");

const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const vhost = require('./node_modules/vhost');


function handler(req, res, next) {
    console.log(req.vhost);
    res.send( 'your request site: ' + req.vhost.hostname)
}


app.use(vhost('trpg.kulimi.cnmc.tw', handler));

app.set('view engine','ejs');
dotenv.config();
//connect Database
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology: true }, () =>
    console.log("DB Started"));
//middleware
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
//routemiddleware
app.use("/api/user", authRoute);
app.use('/',indexRoute);

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    for(var i in req) console.log(i);
    console.log('there will be some error');
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404');
});

const port=process.env.PORT || 3000;
app.listen(port, ()=> console.log("Server Start"));
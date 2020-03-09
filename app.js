const express = require("express");
const app = express();
const dotenv =  require("dotenv");
const mongoose = require("mongoose");
const authRoute =require("./routes/auth");

app.set('view engine','ejs');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology: true }, () =>
    console.log("DB Started"));
//middleware
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
//routemiddleware
app.use("/api/user", authRoute);

app.get("/",function (req,res) {
    res.render('index',{
        title:"首頁"
    });
});
app.get("/about",function (req,res) {
    res.render('index',{
        title:"關於"
    });
});

app.listen(3000, ()  => console.log("Server Started"));

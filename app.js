var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportHttp = require('passport-http');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(express.static(path.join(__dirname,"bower_components"))); //Static files can be served without the request being parsed by the body parser performance improvement
app.use(bodyParser.urlencoded({extended:false})); // urlencoded and extended add to remove decrepted warning
app.use(cookieParser());
app.use(expressSession({
    secret : process.env.SESSION_SECRET || "Bharath",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

//configure routes
app.use(require('./todos'));

app.listen(3000,function(){
    console.log("Server listening to port 3000");
});



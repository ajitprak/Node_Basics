var express = require('express');
var app = express();
var path = require('path');
//Import all passport related modules
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportHttp = require('passport-http');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var https = require('https');
var fs = require('fs');

var server = https.createServer({
    cert:fs.readFileSync(__dirname+"\\my.crt"),
    key: fs.readFileSync(__dirname+"\\my.key")
},app);

function ensureAuthenticated(req,res,next){
    //console.log(req.isAuthenticated);
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.sendStatus(403);
    }
};

//configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(express.static(path.join(__dirname,"bower_components"))); //Static files can be served without the request being parsed by the body parser performance improvement
app.use(bodyParser.urlencoded({extended:false})); // urlencoded and extended add to remove decrepted warning

//configure middle wares needed for passport
app.use(cookieParser());
app.use(expressSession({
    secret : process.env.SESSION_SECRET || "BharathMataKiJAI",
    resave : false,
    saveUninitialized : false
}));

//configure passport
app.use(passport.initialize());
app.use(passport.session());

//Tell passport how to authenticate user - usually a method to call DB

var ourStrategy = function(userName,password,done){
    var err = false;
    if(userName == password){
        //var name = userName+"fullName";
        done(null,{id:userName,name:userName});
    }
    else if(userName != password){
        done(null,null); //call done like this if the username/pwd is wrong
    }
    else if(err){
        done(err);
    }
};
passport.use(new passportLocal.Strategy(ourStrategy));
passport.use(new passportHttp.BasicStrategy(ourStrategy))

//Tell passport how to serialize and de-serialize User
passport.serializeUser(function(user,done){
    done(null,user.id); //First Param is error
});

passport.deserializeUser(function(id,done){
    done(null,{id:id,name:id});//First Param is error
});
//configure route
app.use(require('./todos'));

//Use the passport in the login endpoint
app.post("/login",passport.authenticate('local'),function(req,res){
    console.log("In login Route");
    res.redirect('/')
});

//passport adds this logout method to the request object
app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

app.use('/api',passport.authenticate('basic',{session:false}));

app.get('/api/data',ensureAuthenticated,function(req,res){ //
    res.json([
        {name:"foo"},
        {name:"bar"},
        {name:"baz"}
    ]);
});


server.listen(3000,function(){
    console.log("Server listening to port 3000");
});



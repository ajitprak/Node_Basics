var express = require('express');
var app = express();
var path = require('path')

//configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//use middleware
//configure routes
app.get('/',function(req,res){
    res.render("index");
});

app.listen(3000,function(){
    console.log("Server listening to port 3000")
});



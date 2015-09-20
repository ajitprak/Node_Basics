var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var todoItems = [
            {id:1,desc:"Foo"},
            {id:2,desc:"Bar"},
            {id:3,desc:"Coz"}
        ];

//configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(bodyParser());
//configure routes
app.get('/',function(req,res){
    res.render("index",{
        title:"Node Basics",
        items:todoItems
    });
});

app.post('/add',function(req,res){
    var newItem = req.body.newItem;
    todoItems.push({id:todoItems.length+1,desc:newItem});
    res.redirect('/');
});

app.listen(3000,function(){
    console.log("Server listening to port 3000")
});



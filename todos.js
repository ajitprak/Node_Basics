var express = require('express');
var router = express.Router();

var todoItems = [
            {id:1,desc:"Foo"},
            {id:2,desc:"Bar"},
            {id:3,desc:"Coz"}
        ];


router.get('/',function(req,res){
    res.render("index",{
        title:"Node Basics",
        items:todoItems
    });
});

router.post('/add',function(req,res){
    var newItem = req.body.newItem;
    todoItems.push({id:todoItems.length+1,desc:newItem});
    res.redirect('/');
});

router.get("/login",function(req,res){
    res.render('login');
});

router.post("/login",function(req,res){
    
});

module.exports = router;


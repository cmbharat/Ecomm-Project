var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var users=require('./route/users');

var app = express();

app.use(cors()); 

app.use(bodyParser.json());

// app.use(users);

app.post('/login', users.loginUser);
app.post('/register', users.registerUser);

app.listen(3019, function(){
    console.log("Server started on 3019");
});
mongoose.connect("mongodb://localhost/userInfo", function(){
    console.log("db started")
});
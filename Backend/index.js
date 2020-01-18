var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var users=require('./route/users');

var app = express();

app.use(cors()); 

app.use(bodyParser.json());

 app.use(users);

app.listen(3019, function(){
    console.log("Server started on 3019");
});

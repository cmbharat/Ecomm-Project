const express = require('express');
const app = express();
const body_parser = require('body-parser');
var User = require('../model/user');
var router = express.Router();

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json());

router.post('/addUser', (req, res) => {
    var newUser = new User(req.body);
    newUser.save((err, user) => {

        if (err) {
            res.send({ "message": "error occured" });
        }
        if (user) {
            res.send({ "message": "user added" });
        }
    })
})

router.get('/getUsers', (req, res) => {
    console.log("inside getUsers");
    User.find({}, (err, users) => {
        if (err) {
            res.send({ "message": err.message });
        } else {
            res.send(users);
        }
    })
})

router.delete('/deleteUser/:userId', (req, res) => {

    var id = req.params.userId;

    User.find({ userId: id }, function (err, doc) {
        if (err) {
            res.send({ "message": err.message });

        }
        else {
            User.remove({ userId: id }, function (err) {
                if (err) {
                    console.log(err);
                    return response.send({ status: false });
                }
                else {
                    return response.send({ status: true });
                }

            })
        }
    })

})

router.put('/updateUser/:userId', (req, res) => {
    var id = req.params.userId;

    User.update({ userId: id }, req.body, (err, raw) => {
        if (err) {
            console.log(err);
            res.send({ status: false })
        }
        else {
            res.send({ status: true });
        }
    })
}
)

exports.loginUser = function (req, res){
    var emailId = req.body.emailId;
    var password = req.body.password;
    User.findOne({emailId : emailId}, function (err, obj) {
       if(err){
           res.send({status: false, message: "error occured while procesing login request"});
           console.log(err);
       } else {
           if(obj == null){
               res.send({status : false, message : "User not registered"});
           } else {
               if(obj.password == password){
                   res.send({status : true, message : "login successful", obj});
                   console.log(obj);
               } else {
                   res.send({status : false, message : "Incorrect password"});
                   console.log(obj);
               }
           }
       }
    });
}


exports.registerUser = function (req, res) {
    console.log(req.body);
    var userId = req.body.userId;
    var userName = req.body.userName;
    var mobile = req.body.mobile;
    var emailId = req.body.emailId;
    var password = req.body.password;
    var newUser = new User({
        userId: userId,
        userName: userName,
        emailId: emailId,
        password: password,
        mobileNumber: mobile
    });
    console.log(newUser)
    User.findOne({ emailId: emailId }, function (err, event) {
        if (err) {
            res.send({status : false, message:"Error occured while finding if email exists", err});
            console.error(err);
        }
        else {
            if (event == null) {
                newUser.save(function (err1, result) {
                    if (err1) {
                        res.send({ status: false, message: "Registration failed", err1 });
                        console.error(err1);
                    } else {
                        res.send({ status: true, message: "Registration successful", result });
                        console.log(result);
                    }
                });
            } else {
                res.send({ status: false, message: "Email already exists:", event });
                console.log("email already exists:" + event);
            }
        }
    });
}


// module.exports = router;


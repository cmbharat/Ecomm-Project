//import * as bcrypt from 'bcryptjs';


const express = require('express');
const app = express();
const body_parser = require('body-parser');
const jwt=require('jsonwebtoken');

var User = require('../model/user');
var Career=require('../model/Careers');
var router = express.Router();
var mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
var saltRounds=10
var encryptedPassword="";

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json());

mongoose.connect("mongodb://localhost/userInfo", err=>{
   if(err) 
   {
       console.error(err);
    }
   else{
    console.log("db started");
   }
});

function verifyToken(req,res,next)
{

    console.log("inside verify Token "+req.headers.authorization.split('')[1]);
    if(!req.headers.authorization)
    {
        console.log("inside verify Token if--1");
        return res.status(401).send('Unauthorized Request');
    }
    let token=req.headers.authorization.split(' ')[1];
     
    if(token=='null')
    {
        console.log("inside verify Token if--2");
        return res.status(401).send('Unauthorized Request');
    }
    let payload=jwt.verify(token,'secretKey')
     
    if(!payload)
    {
        console.log("inside verify Token if--3");
        return res.status(401).send('Unauthorized Request')  
    }

    req.userId=payload.subject;
    console.log("userid",req.userId);
    next()

    
}
///Authentication code
router.get('/',(req,res)=>{
    res.send("from api route");
})

router.post('/register',(req,res)=>{
    
    let userData=req.body;
    var user={};
    console.log(userData.password);
    bcrypt.hash(userData.password,saltRounds,(err,hash)=>{
        if(!err){
            console.log("inside hashing method"+hash);
            encryptedPassword=hash;
            userData.password=encryptedPassword;       
            user=new User(userData);     
            console.log("user password"+user.password);
        }
        else{
            console.log('Error: ',err)
        }
        })
    console.log("password after encryption : "+userData.password);
    

    User.findOne({ emailId: req.body.emailId }, function (err, event) {

        if(err)
        {
          console.log(err);
          res.send({status : false, message:"Error occured while finding if email exists", err});
        }
        else {
            if (event == null) {
                user.save(function (err1, result) {
                    if (err1) {
                        console.log("inside register user ");
                        
                        res.send({ status: false, message: "Registration failed", err1 });
                        console.error(err1);
                    } else {
                        let payload={subject:result._id};
                        let token=jwt.sign(payload,'secretKey');
                        res.status(200).send({token});
                        res.send({ status: true, message: "Registration successful", result });
                        console.log(result);
                    }
                });
            } else {
                res.send({ status: false, message: "Email already exists:", event });
                console.log("email already exists:" + event);
            }
         }

    })

    // user.save((err,registeredUser)=>{
    //     if(err)
    //     {
    //       console.log(err);
          
    //     }else{
    //       console.log("inside register user ");
    //       let payload={subject:registeredUser._id};
    //       let token=jwt.sign(payload,'secretKey');
    //       res.status(200).send({token});
    //     }
    // })


})


router.post('/login',(req,res)=>{

    let userData=req.body;
    
    User.findOne({emailId:userData.emailId},(error,user)=>{
  
        if(error){
            res.status(401).send('invalid Email');
        }
        
        else{
            
            console.log(userData.password);
            //console.log(user.password);
            
            if(!user)
            {
                res.status(401).send('invalid Email');
            }
            else{
                let result;
                bcrypt.compare(userData.password,user.password ,(err,res)=>{

                    if(!err){
                        console.log('password correct: ',res)
                        result=res;
    
                    }else{
                        console.log("error",err);
                    }
                });

             if(result)
            {
                res.status(401).send('invalid password');
            }
            else
            {
                let payload={subject:user._id};
                let token=jwt.sign(payload,'secretKey');
                res.status(200).send({token});
            }}
        }

    });
})


///Authentication code ends

//career api//
router.get("/career",verifyToken,(req,res)=>{
    let Careers=new Career({
                JobDesc: "Full Stack Development",
                JobID:   12,
                Country: "India",
                Location: "Bangalore"
            });
    res.json({"Careers": Careers});
})



// exports.registerUser = function (request, res) {
//     console.log(request.body);
//     console.log("inside register user");
//     var userId =request.body.userId;
//     var userName = request.body.userName;
//     var mobile = request.body.mobile;
//     var emailId = request.body.emailId;
//     var password = request.body.password;
//     var newUser = new User({
//         userId: userId,
//         userName: userName,
//         emailId: emailId,
//         password: password,
//         mobile: mobile
//     });
//     console.log(newUser);
    // User.findOne({ emailId: emailId }, function (err, event) {
    //     if (err) {
    //         res.send({status : false, message:"Error occured while finding if email exists", err});
    //         console.error(err);
    //     }
        // else {
        //     if (event == null) {
        //         newUser.save(function (err1, result) {
        //             if (err1) {
        //                 res.send({ status: false, message: "Registration failed", err1 });
        //                 console.error(err1);
        //             } else {
        //                 res.send({ status: true, message: "Registration successful", result });
        //                 console.log(result);
        //             }
        //         });
        //     } else {
        //         res.send({ status: false, message: "Email already exists:", event });
        //         console.log("email already exists:" + event);
        //     }
        //  }
    //  });
// }

// function getValueForNextSequence(sequenceOfName){
    
//     console.log("inside get sequence value");
//          var sequenceDoc = db.Counter.findAndModify({
//           query:{_id: sequenceOfName },
//           update: {$inc:{sequence_value:1}},
//           new:true
//         });
    
//          return sequenceDoc.sequence_value;
//  }
    

module.exports = router;

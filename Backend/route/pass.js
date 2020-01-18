const bcrypt=require('bcryptjs')
let saltRounds=10
let myString='Qwerty123'
var encryptedPass="";

bcrypt.hash(myString,saltRounds,(err,hash)=>{
    if(!err){
        console.log(hash);
        encryptedPass=hash;
        
    }
    else{
        console.log('Error: ',err)
    }
    })


bcrypt.compare('Qwerty123','$2a$10$vRo60AajECmPiFmcafvRfeXhXNnpsf0w02uCisA5coMp2kqH0cwm6',(err,res)=>{

    if(!err){
        console.log('password correct: ',res)
    }else{
        console.log("error",err);
    }
});
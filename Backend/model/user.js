var mongoose=require('mongoose');
var schema=mongoose.Schema;

var UserSchema=new schema({

    userId:{
        type:Number,
        unique : true,
        index : true
    },
    userName:{
        type:String
    },
    mobile:{
        type:Number
    },
    emailId : {
        type : String,
        unique : true,
        index : true
    },
    password : {
        type : String
    }
});

module.exports=mongoose.model('User',UserSchema);
var mongoose=require('mongoose');
var schema=mongoose.Schema;

var CareerSchema=new schema({

    JobDesc:{
        type:String
    },
    JobID:{
        type:Number,
        unique : true,
        index : true
    },
    Country : {
        type : String,
    },
    Location : {
        type : String
    }
});

module.exports=mongoose.model('Careers',CareerSchema);
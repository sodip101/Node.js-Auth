const mongoose=require('mongoose');
const {isEmail}=require('validator');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Please enter a password of minimum length 6']
    }
});

module.exports=new mongoose.model('User',userSchema);
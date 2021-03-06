const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

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

//password hashing using mongoose 'pre' hook
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

//mongoose 'post' hook
// userSchema.post('save',function(doc,next){
//     console.log('new user added',doc);
//     next();
// });

//static method for user login
userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email});
    if(user){
        const auth=await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password!');
    }
    throw Error('Invalid Email!');
}

module.exports=new mongoose.model('User',userSchema);
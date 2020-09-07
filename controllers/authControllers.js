const User=require('../models/User');
//errorHandler
const errorHandler=(err)=>{
    console.log(err.message,err.code);
    let errors={email:'',password:''};

    //duplicate error code
    if(err.code===11000){
        errors.email='The email you entered has already been registered';
        return errors;
    }

    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }
    return errors;
};

module.exports.signupGet=(req,res)=>{
    res.render('signup');
};

module.exports.loginGet=(req,res)=>{
    res.render('login');
};

module.exports.signupPost=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.create({email,password});
        res.status(201).json(user);
    }catch(err){
        const errors=errorHandler(err);
        console.log(err.message);
        res.status(400).json({errors});
    }
};

module.exports.loginPost=(req,res)=>{
    res.send('user login');
};
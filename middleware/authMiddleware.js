const jwt=require('jsonwebtoken');
const User = require('../models/User');

exports.requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check jwt web token exists & is verified
    if(token){
        jwt.verify(token,'first try at auth with node',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
}

exports.checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;
    
    if(token){
        jwt.verify(token,'first try at auth with node',async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next();
            }else{
                console.log(decodedToken);
                let user=await User.findById(decodedToken.id);
                res.locals.user=user;
                next();
            }
        });
    }else{
        res.locals.user=null;
        next();
    }
}
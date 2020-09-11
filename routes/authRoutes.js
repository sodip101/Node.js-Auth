const {Router}=require('express');
const authControllers=require('../controllers/authControllers.js');
const router=Router();

router.get('/signup',authControllers.signupGet);

router.post('/signup',authControllers.signupPost);

router.get('/login',authControllers.loginGet);

router.post('/login',authControllers.loginPost);

router.get('/logout',authControllers.logout_get);

module.exports=router;
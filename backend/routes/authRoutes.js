const express=require('express');
const router=express.Router();
const { signUp,
    login, logout,UserSignUp,
    Userlogin}=require('../controllers/authController');
const Userauth=require('../middleware/auth');
const authVLE = require('../middleware/vleauth');
router.use(express.json());

router.use(express.json());
const auth=require('../middleware/auth');

router.post('/signup',signUp);
router.post('/admin/signup',UserSignUp);
router.post('/login',login);
 router.post('/admin/login',Userlogin);
router.post('/admin/logout',Userauth,logout);
// router.post('/logout',authVLE,logout);

module.exports=router;
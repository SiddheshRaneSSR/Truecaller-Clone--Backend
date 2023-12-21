const express=require('express');
const router=express.Router();
const { user_login } = require('../../controllers/user/Userlogin.js');
const { user_register } = require('../../controllers/user/UserCreate.js');
const { user_logout } = require('../../controllers/user/UserLogout.js');
const authenticateUser = require('../../middlewares/auth_middleware.js');



router.post('/login',user_login);
router.post('/register',user_register);
router.post('/logout',authenticateUser,user_logout);

module.exports=router;
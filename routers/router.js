const express=require('express');
const router=express.Router();
const { UserCreate } = require("../controllers/user/UserCreate");
const { user_login } = require('../controllers/user/Userlogin');
const { userLogout } = require('../controllers/user/UserLogout');
const check_user_auth = require('../middlewares/auth_middleware.js');
const { newTask } = require('../controllers/task/newTask.js');
const { taskdetails } = require('../controllers/task/taskDetails.js');
const { gettask } = require('../controllers/task/gettask.js');


router.post("/userregister",UserCreate);
router.post("/userlogin",user_login);
router.post("/userlogout",userLogout);

router.post("/newTask",newTask);
router.post("/taskDetails",taskdetails);
router.get("/gettask/:param*",gettask);
router.delete('/deleteTask/:id', deleteTask); 


module.exports=router;
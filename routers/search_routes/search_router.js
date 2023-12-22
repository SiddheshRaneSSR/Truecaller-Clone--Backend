const express=require('express');
const router=express.Router();
const authenticateUser = require('../../middlewares/auth_middleware.js');
const { SearchUserByName } = require('../../controllers/search/SearchUserByName.js');
const { SearchUserByphoneNumber } = require('../../controllers/search/SearchUserByPhoneNumber.js');
const { SearchUser } = require('../../controllers/search/SearchUser.js');


router.post("/SearchUserByName/:name",authenticateUser,SearchUserByName);
router.post("/SearchUserByPhoneNumber/:phoneNumber",authenticateUser,SearchUserByphoneNumber);
router.get("/SearchUser/:id",authenticateUser,SearchUser);


module.exports=router;
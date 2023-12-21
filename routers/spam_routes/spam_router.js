const express=require('express');
const router=express.Router();
const authenticateUser = require('../../middlewares/auth_middleware.js');
const { SpamReport } = require('../../controllers/SpamReport/SpamReport.js');
const { SearchUser } = require('../../controllers/search/SearchUser.js');



router.post('/SpamReport',authenticateUser,SpamReport);
router.get("/SearchUser/:id",authenticateUser,SearchUser);



module.exports=router;
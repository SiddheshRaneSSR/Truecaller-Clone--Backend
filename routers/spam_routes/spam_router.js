const express=require('express');
const router=express.Router();
const authenticateUser = require('../../middlewares/auth_middleware.js');
const { SpamReport } = require('../../controllers/SpamReport/SpamReport.js');



router.post('/SpamReport',authenticateUser,SpamReport);

module.exports=router;
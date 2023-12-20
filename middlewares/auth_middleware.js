// import jwt for check the user is valid user or not
const jwt = require('jsonwebtoken');

// import user model for get the user data
const usermodel = require('../models/user_model.js');

// function for auth  
const check_user_auth = async (req,res,next) => {
    let token;
    //  get authorization data from headers
    const {authorization} = req.headers;

    // check all data is comming are not
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = authorization.split(' ')[1];

            // verify token
            const {userid} = jwt.verify(token,process.env.JWT_SECRET_KEY);

            // get payload data from jwt
                // const _user_data = jwt.decode(token)

            // get user from token 
            req.user = await usermodel.findById(userid).select("-password");
            
            // next call
            next();
        } catch (error) {
            // send the error message for user
            res.status(401).send({"status":"failed","msg":"Unauthorized User"});
        }
    }
    // send the error meaage for user if the token is not comming
    if (!token) {
        res.status(401).send({"status":"failed","msg":"Unauthorized User no token"});
    }
}

// export middleware
    module.exports = check_user_auth;
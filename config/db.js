const mongoose = require("mongoose");
require('dotenv').config();

const connect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 20000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        w: "majority",
    })
    .then(()=>{
        console.log("connection established ")
    })
    .catch((error)=>{
        console.log(error)
    })
}
 


// exports.module=connect;
//process.env.DATABASE_URL
module.exports=connect;
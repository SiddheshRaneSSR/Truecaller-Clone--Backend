const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dbconnect = require('./config/db');
const router = require("./routers/router");
const session = require("express-session");




// Connect DB
dbconnect();


//  Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('views'));
app.set('view engine','ejs');

app.use(session({
    secret: process.env.SESSION_SECRET_KEY, // Add a secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Adjust as needed, set to true if using HTTPS
  }));



app.get(['/','/login'],(req,res)=>{

    res.render("loginUser");

})
app.get('/registerUser',(req,res)=>{

    res.render("registerUser");

})

app.use('',router);

// Start the server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App is listening at PORT ${PORT}`));
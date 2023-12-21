const express = require('express');
const cors = require('cors');
const app = express();
const user_router = require("./routers/user_routes/user_router");
const search_router = require("./routers/search_routes/search_router");
const spam_router = require("./routers/spam_routes/spam_router");
const session = require("express-session");
const sequelize = require("./config/database");

// Check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


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



app.use('/api/v1/users',user_router);
app.use('/api/v1/search',search_router);
app.use('/api/v1/spam',spam_router);

// Start the server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App is listening at PORT ${PORT}`));
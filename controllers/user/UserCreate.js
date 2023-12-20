const User = require("../../models/user_model");
const bcrypt=require('bcrypt');
const uuid = require('uuid');

exports.UserCreate = async (req, res) => {
  try {
    const { email, password, confirmPassword, position, userJoiningDate } = req.body;
    console.log(email, password, confirmPassword, position, userJoiningDate)
    // Validate input (replace this with your validation logic)
    if (!email || !password || !confirmPassword || !position || !userJoiningDate) {
      return res.status(400).send('All fields are required');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }



    // You can adjust the number of salt rounds based on your security requirements
    const saltRounds = 10; 

    //hashing password
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    
    //creating unique ID for Emp using uuid
    const EmpID = uuid.v4();

    const newUser = new User({
      EmpID,
      email,
      password: hashedpassword,
      position,
      user_joining_date: new Date(userJoiningDate),
    });

    // Save the user to the database
    await newUser.save();

    // Store user data in the session
    // req.session.user = {
    //   email:newUser.email,
    //   position:newUser.position
    //   // No probation-related fields
    // };
    
    // console.log(req.session.user.email);
    res.redirect('/login');


    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to insert user details",
    });
  }
};

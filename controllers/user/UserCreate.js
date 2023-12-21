const schema = require("../../models/user_model");
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');




exports.user_register = async (req, res) => {
  try {
    
    const { name, phone_number, email, password, confirm_password  } = req.body;
    
      // Validate input
    if (!name || !phone_number || !password || !confirm_password) {
      return res.status(400).json({ "status": "failed", "msg": "All fields are required" });
    }

    // Additional validations
    if (name.length > 50) {
      return res.status(400).json({ "status": "failed", "msg": "Name should be under 50 characters" });
    }

    const phoneNumberRegex = /^\d{10}$/; // Assuming a 10-digit phone number format
    if (!phoneNumberRegex.test(phone_number)) {
      return res.status(400).json({ "status": "failed", "msg": "Invalid phone number format" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ "status": "failed", "msg": "Passwords do not match" });
    }

    try {
      // Check if the phone number is already registered
      const existingUser = await schema.findOne({ where: { phone_number } });
      if (existingUser) {
        return res.status(400).json({ "status": "failed", "msg": "Phone number is already registered" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const newUser = await schema.create({
        name,
        phone_number,
        email,
        password: hashedPassword,
      });
  
      // Generate JWT token
      const token = jwt.sign({ id: newUser.id, phone_number: newUser.phone_number }, 'your-secret-key');
  
      // Store token in session (optional)
      req.session.token = token;
  
      res.status(201).json({ "status": "success", "msg": "User registered successfully", token });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ "status": "failed", "msg": "Internal Server Error" });
    }
  }catch (error) {
    console.error('Error in user_register:', error);
    res.status(500).json({ "status": "failed", "msg": "Internal Server Error" });
  }

}

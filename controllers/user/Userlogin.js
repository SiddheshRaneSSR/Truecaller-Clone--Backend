const schema = require("../../models/user_model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_login = async (req, res) => {
  try {
    const { number, password } = req.body;
    const numberRegrex = /^\d{10}$/; 
    
      
    // Validate input
    if (!number || !password) {
      return res.status(400).json({ "status": "failed", "msg": "All fields are required" });
    }

    // Validate phone phone_number format
    const phonephone_numberRegex = /^\d{10}$/; // Assuming a 10-digit phone phone_number format
    if (!phonephone_numberRegex.test(phone_phone_number)) {
      return res.status(400).json({ "status": "failed", "msg": "Invalid phone phone_number format" });
    }

    // Check if the user is present in the database
    const userPresent = await schema.findOne({ where:{phone_number} });

    if (userPresent) {
      // Check hashed password
      const isMatch = await bcrypt.compare(password, userPresent.password);

      if (isMatch) {


        // Generate JWT token
        const token = jwt.sign({ userId: userPresent._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        req.session.email=userPresent.email;
        req.session.token=token;
        req.session.EmpID=userPresent.EmpID;


        // Respond with success and token
        return res.status(200).send({
          "status": "success",
          "msg": "Welcome " + userPresent.email,
          "user_token": token
        });
      } else {
        return res.status(400).send({ "status": "failed", "msg": "Invalid password for " + email });
      }
    } else {
      return res.status(400).send({ "status": "failed", "msg": email + " is not registered. Please register first" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ "status": "failed", "msg": "Something went wrong. Please check again" });
  }
};

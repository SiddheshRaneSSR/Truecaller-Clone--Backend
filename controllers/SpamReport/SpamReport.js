// spam_report_routes.js
const express = require('express');
const router = express.Router();
const authenticateUser = require('./path-to-your-authMiddleware');
const SpamReport = require('./path-to-your-spam-report-model');
const UserProfile = require('./path-to-your-user-profile-model');

// Endpoint to mark a phone number as spam
exports.SpamReport =  async (req, res) => {
  try {
    const { phone_number } = req.body;
    const userId = req.user.id; 

    // Create a new spam report
    const newReport = await SpamReport.create({
      phone_number,
      USERID: userId,
    });

    res.status(201).json({ message: 'Phone number marked as spam successfully', report: newReport });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (user tried to report the same phone number again)
      return res.status(400).json({ message: 'User already reported this phone number as spam' });
    }

    console.error('Error marking phone number as spam:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

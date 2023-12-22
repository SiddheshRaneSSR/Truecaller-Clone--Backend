
const UserProfile = require('../../models/user_model');
const SpamReport = require('../../models/SpamReport_model');
const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);


// Display details for a person
exports.SearchUserByphoneNumber = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
    
        const users = await UserProfile.findAll({
          where: {
            phoneNumber: {
              [Sequelize.Op.substring]: phoneNumber,
            },
          },
          attributes: ['id', 'name', 'phoneNumber'],
        });
    
        res.json(users);
      } catch (error) {
        console.error('Error searching users by phone number:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }


};

// Real-time updates for selected user by phone number
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    // Listen for the selected user's details request by phone number
    socket.on('getUserDetailsByPhone', async (phoneNumber) => {
      try {
        const user = await UserProfile.findOne({
          where: {
            phoneNumber: {
              [Sequelize.Op.eq]: phoneNumber,
            },
          },
        });
  
        if (!user) {
          // Handle the case where the user is not found
          socket.emit('userDetailsByPhone', null);
          return;
        }
  
        const spamReportsCount = await SpamReport.count({
          where: {
            userId: user.id,
            phoneNumber: { [Sequelize.Op.ne]: null }, // Count only reports with phone numbers
          },
        });
  
        const totalUsersCount = await UserProfile.count();
  
        // Calculate spam likelihood as a percentage
        const spamLikelihood = spamReportsCount > 0
          ? 100  // If the user has a phone number under spam reports, set likelihood to 100%
          : (spamReportsCount / totalUsersCount) * 100;
  
        // Prepare the detailed user information with spam likelihood
        const userDetails = {
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          spamLikelihood: spamLikelihood.toFixed(2), // Round to two decimal places
        };
  
        // Emit the user details to the client
        socket.emit('userDetailsByPhone', userDetails);
      } catch (error) {
        console.error(error);
      }
    });
  });
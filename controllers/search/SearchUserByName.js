
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
exports.SearchUserByName = async (req, res) => {
try {
    const { name } = req.params;

    const users = await UserProfile.findAll({
    where: {
        name: {
        [Sequelize.Op.substring]: name,
        },
    },
    attributes: ['id', 'name'],
    });

    res.json(users);
} catch (error) {
    console.error('Error getting person details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
}
};

// Real-time updates for selected user
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    // Listen for the selected user's details request
    socket.on('getUserDetails', async (userId) => {
      try {
        const user = await UserProfile.findByPk(userId);
        if (!user) {
          // Handle the case where the user is not found
          socket.emit('userDetails', null);
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
        socket.emit('userDetails', userDetails);
      } catch (error) {
        console.error(error);
      }
    });
  });


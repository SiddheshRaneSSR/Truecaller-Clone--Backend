
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key

    // Attach user information to the request for further use
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticateUser;

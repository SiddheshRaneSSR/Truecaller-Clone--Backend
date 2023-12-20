const session = require('express-session');


exports.userLogout = async (req, res) => {
    // Assuming you are using express-session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logout successful' });
    });
};
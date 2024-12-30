const express = require('express');
const User = require('../models/User'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret key for JWT (replace with your secure secret key, use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST: Store loginTime for an existing user and generate JWT
router.post('/user', async (req, res) => {
    const { loginTime, email, name, latitude, longitude } = req.body;

    // Validation to ensure that email, name, loginTime, latitude, and longitude are provided
    if (!loginTime || !email || !name || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields (loginTime, email, name, latitude, longitude) are required.' });
    }

    try {
        // Check if the user exists by email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Validate and add the new login time with latitude and longitude
        const newLoginTime = new Date(loginTime);  // User's provided time
        const offset = 5.5 * 60; // IST is UTC+5:30
        const istTime = new Date(newLoginTime.getTime() + offset * 60000); // Adjust time to IST

        // Add the new login entry with latitude and longitude
        user.loginTimes.push({
            time: istTime, // Store the time in IST
            latitude: latitude.toString(),
            longitude: longitude.toString(),
        });

        // Generate a JWT for the user
        const tokenPayload = {
            id: user._id,       // Include user ID in the token
            email: user.email,  // Include email for reference
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '5h' }); // Token valid for 5 hours

        // Save the updated user document
        await user.save();

        // Respond with the user's name, email, token, and updated login times
        res.status(200).json({
            message: 'Login time and location stored successfully.',
            user: {
                name: user.name,
                email: user.email,
                loginTimes: user.loginTimes,
            },
            authToken: token, // Return the generated JWT
        });
    } catch (error) {
        console.error('Error storing login time:', error);  // Log the full error for better debugging
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ message: 'Email is already taken.' });
        }
        res.status(500).json({ message: 'Internal Server Error.', error: error.message });  // Provide more details in the response
    }
});

module.exports = router;

const express = require('express');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const VITE_API_URL_2 = process.env.VITE_API_URL_2 || 'https://localhost:5000/api/user';
router.post(`${VITE_API_URL_2}/user`, async (req, res) => {
    const { loginTime, email, name, latitude, longitude } = req.body;

    if (!loginTime || !email || !name || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields (loginTime, email, name, latitude, longitude) are required.' });
    }

    try {
        // Check if the user exists by email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const newLoginTime = new Date(loginTime); 
        const offset = 5.5 * 60;
        const istTime = new Date(newLoginTime.getTime() + offset * 60000); 

        // Add the new login entry with latitude and longitude
        user.loginTimes.push({
            time: istTime, // Store the time in IST
            latitude: latitude.toString(),
            longitude: longitude.toString(),
        });

        // Generate a JWT for the user
        const tokenPayload = {
            id: user._id,      
            email: user.email,  
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '5h' }); 

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
        res.status(500).json({ message: 'Internal Server Error.', error: error.message });  
    }
});

module.exports = router;

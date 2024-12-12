// backend/routes/login.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure the correct path to your User model
const bcrypt = require('bcryptjs');

// POST /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Store login time in the database
        const currentLoginTime = new Date(); // Get the current date and time
        user.loginTime = currentLoginTime; // Update the loginTime field

        // Save the user with the updated loginTime
        await user.save();

        // Send the response with the user's info
        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                loginTime: user.loginTime,  // Include loginTime in the response
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

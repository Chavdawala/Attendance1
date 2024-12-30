const express = require('express');
const jwt = require('jsonwebtoken'); // Add this if not already imported
const router = express.Router(); // Initialize the router object
const User = require('../models/User'); // Adjust the path to your User model
const cors = require('cors');

// POST /api/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!', user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET /api/user
router.get('/user', async (req, res) => {
    try {
        const authToken = req.headers.authorization.split("@")[1]; // Extract the token
        const userId = jwt.verify(authToken, "your_secret_key").id; // Decode the token to get user ID

        // Fetch user from the database
        const user = await User.findById(userId).select("name email");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error in /api/user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; // Export the router

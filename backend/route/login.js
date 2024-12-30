const express = require('express'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 
const router = express.Router(); 

// POST method for login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {                                                                                                                                                     
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        // Include name and email in the response
        res.status(200).json({
            message: 'Login successful',
            authToken,
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET method for login (Example: Retrieve user details from token)
router.get('/login', async (req, res) => {
    try {
        // Get the token from the Authorization header
        const authToken = req.headers.authorization?.split('@')[1];

        if (!authToken) {
            return res.status(401).json({ message: 'Authorization token is required.' });
        }

        // Decode the token to retrieve user ID
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('name email');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Send user details in response
        res.status(200).json({
            message: 'User retrieved successfully',
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error during GET /login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

// route/routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// POST request to register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide an email and password.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user instance
    const newUser = new User({
      email,
      password, // The password will be hashed when saving due to the pre-save hook
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = 'your-secret-key'; // Use a real secret key

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Update login time
    user.loginTime = new Date(); // Set current time as login time
    await user.save();

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send token and user data (name, email, loginTime)
    res.json({
      token,
      name: user.name,
      email: user.email,
      userId: user._id, // Send userId for logout tracking
      loginTime: user.loginTime,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

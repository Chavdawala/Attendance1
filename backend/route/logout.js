const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST /logout
router.post('/logout', async (req, res) => {
  const { userId, logoutTime } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update logout time for the user
    user.logoutTime = logoutTime; // Set logout time to current time
    await user.save();

    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

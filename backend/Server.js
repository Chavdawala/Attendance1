// /server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const loginRoutes = require('./route/login');
const logoutRoutes = require('./route/logout');
const userRoutes = require('./route/routes');

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);  
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);

// Route to handle login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the entered password matches the stored hashed password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send token in the response
  res.json({ message: 'Login successful', token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

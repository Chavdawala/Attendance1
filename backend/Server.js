const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Import routes
const register = require('./route/routes');
const loginRoute = require('./route/login');
const userRoute = require('./route/user');
const logoutTime = require('./route/Logouttime'); // Corrected to match the import

// Use routes
app.use('/api', register);  // Register route under /api
app.use('/api', loginRoute);      // Login route under /api
app.use('/api', userRoute);
app.use('/api', logoutTime);  // Corrected to match the import

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => console.log(err));

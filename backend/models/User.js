const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware to hash password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            // Generate a salt and hash the password with it
            const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds
            this.password = await bcrypt.hash(this.password, salt);
            next(); // Proceed to save the user after hashing
        } catch (error) {
            next(error); // Pass the error to the next middleware if any
        }
    } else {
        next(); // If password is not modified, continue with the save operation
    }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

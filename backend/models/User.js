// /models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Make sure this package is installed

const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    // Note: You can reuse this model for 'admin' and 'delivery' by setting the role, 
    // but since you have a separate Admin.js file, we will proceed with 'user' for this file's context.
    role: { 
        type: String, 
        required: true, 
        enum: ['customer', 'admin', 'delivery'], 
        default: 'customer' 
    },
    address: { 
        street: String, 
        city: String, 
        postalCode: String 
    },
    phone: {
        type: String 
    },
    // isAvailable: Only applicable for delivery agents
    isAvailable: { 
        type: Boolean, 
        default: function() { return this.role === 'delivery'; } 
    }
}, {
    timestamps: true
});


// 1. Password Hashing (Pre-Save Hook)
// This runs BEFORE saving the document and hashes the password if it's new or modified.
userSchema.pre('save', async function () {
    // Check if the password field is being modified (this prevents re-hashing an already hashed password)
    if (!this.isModified('password')) {
        return; // Exit the hook and proceed to save
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // The save operation will automatically continue when this async function resolves.
});


// 2. Password Comparison Method
// This method is added to the user document and used during the login process.
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Compares the plain-text password with the stored hash
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
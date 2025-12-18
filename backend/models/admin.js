// /models/admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Required for pre-save hook

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    storeAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


// 1. Password Hashing (Pre-Save Hook)
AdminSchema.pre('save', async function () { 
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// 2. Password Comparison Method
AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema); // Export the Admin model
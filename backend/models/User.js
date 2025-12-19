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
  
    isAvailable: { 
        type: Boolean, 
        default: function() { return this.role === 'delivery'; } 
    }
}, {
    timestamps: true
});


userSchema.pre('save', async function () {

    if (!this.isModified('password')) {
        return; 
    }


    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   
});



userSchema.methods.matchPassword = async function (enteredPassword) {
    
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
const User = require('../models/User');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const generateToken = (id, role) => {
    
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d', 
    });
};


const registerUser = asyncHandler(async (req, res) => {
    
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Name, email and password are required');
    }

    // Check if user exists in both collections
    const userExists = await User.findOne({ email });
    const adminExists = await Admin.findOne({ email });

    if (userExists || adminExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // If role is admin, create in Admin collection
    if (role === 'admin') {
        const admin = await Admin.create({
            firstName: name.split(' ')[0] || name,
            secondName: name.split(' ')[1] || 'Admin',
            email,
            password,
            mobileNumber: '1234567890',
            storeName: 'Default Store',
            storeAddress: 'Default Address'
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                name: `${admin.firstName} ${admin.secondName}`,
                email: admin.email,
                role: 'admin',
                token: generateToken(admin._id, 'admin'),
            });
        } else {
            res.status(400);
            throw new Error('Invalid admin data');
        }
    } else {
        // Create regular user
        const user = await User.create({
            name,
            email,
            password, 
            role: role || 'customer' 
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password are required');
    }

    // Check Admin collection first
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
        return res.json({
            _id: admin._id,
            name: `${admin.firstName} ${admin.secondName}`,
            email: admin.email,
            role: 'admin',
            token: generateToken(admin._id, 'admin'),
        });
    }

    // Check User collection
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, 
            token: generateToken(user._id, user.role),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


const getMe = asyncHandler(async (req, res) => {
   
    res.status(200).json(req.user);
});


// Admin Registration
const registerAdmin = asyncHandler(async (req, res) => {
    const { firstName, secondName, email, password, mobileNumber, storeName, storeAddress } = req.body;

    if (!firstName || !secondName || !email || !password || !mobileNumber || !storeName) {
        res.status(400);
        throw new Error('Missing required admin fields');
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({
        firstName,
        secondName,
        email,
        password,
        mobileNumber,
        storeName,
        storeAddress
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            firstName: admin.firstName,
            secondName: admin.secondName,
            email: admin.email,
            storeName: admin.storeName,
            role: 'admin',
            token: generateToken(admin._id, 'admin'),
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
});


// Admin Login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            firstName: admin.firstName,
            secondName: admin.secondName,
            email: admin.email,
            role: 'admin',
            token: generateToken(admin._id, 'admin'),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


module.exports = { registerUser, loginUser, getMe, registerAdmin, loginAdmin };
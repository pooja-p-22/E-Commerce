const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // For cleaner async error handling
const User = require('../models/User'); 
const dotenv = require('dotenv');

dotenv.config(); 


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
   
    else if (req.body.token) { 
        token = req.body.token;
    }

    if (!token) {
        res.status(401); 
        throw new Error('Not authorized, token missing');
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized, user in token no longer exists');
        }
        
       
        next();

    } catch (error) {
        
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});



const authorizeRoles = (...roles) => {
    return (req, res, next) => {
       
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403); 
            throw new Error(`Access Denied. User role ${req.user.role} is not authorized for this action.`);
        }
        next();
    };
};


const admin = authorizeRoles('admin');
const customer = authorizeRoles('customer');
const delivery = authorizeRoles('delivery');


module.exports = { protect, admin, customer, delivery, authorizeRoles };
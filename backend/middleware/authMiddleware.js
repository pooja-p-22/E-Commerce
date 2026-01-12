const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); 
const User = require('../models/User'); 
const Admin = require('../models/admin');
const dotenv = require('dotenv');

dotenv.config(); 


const protect = asyncHandler(async (req, res, next) => {
    let token;

    
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    
    else if (req.headers && req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    else if (req.body && req.body.token) { 
        token = req.body.token;
    }

    if (!token) {
        res.status(401); 
        throw new Error('Not authorized, token missing');
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        
        if (decoded.role === 'admin') {
            req.user = await Admin.findById(decoded.id).select('-password');
            if (req.user) {
                req.user.role = 'admin';
            }
        } else {
            req.user = await User.findById(decoded.id).select('-password');
            if (req.user) {
                req.user.role = req.user.role || 'customer'; 
            }
        }

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
        const role = req.user?.role;
        if (!role || !roles.includes(role)) {
            res.status(403);
            const roleLabel = role ?? 'unknown';
            throw new Error(`Access Denied. User role ${roleLabel} is not authorized for this action.`);
        }
        next();
    };
};


const admin = authorizeRoles('admin');
const customer = authorizeRoles('customer');
const delivery = authorizeRoles('delivery');


module.exports = { protect, admin, customer, delivery, authorizeRoles };
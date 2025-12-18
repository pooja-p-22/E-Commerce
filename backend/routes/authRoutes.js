const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, registerAdmin, loginAdmin } = require('../api-function/authController');
const { protect } = require('../middleware/authMiddleware');

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

router.get('/me', protect, getMe);

module.exports = router;
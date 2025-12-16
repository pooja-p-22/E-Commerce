const express = require('express');
const router = express.Router();
const { protect, delivery } = require('../middleware/authMiddleware');
const { getAssignedOrders, updateOrderStatus } = require('../api-function/orderController');


router.get('/orders/assigned', protect, delivery, getAssignedOrders);


router.put('/orders/:id/status', protect, delivery, updateOrderStatus);



module.exports = router;
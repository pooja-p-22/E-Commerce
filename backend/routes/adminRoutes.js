const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');


const { getAllOrders, getDeliveryAgents, createDeliveryAgent, assignDeliveryAgent, updateProductStock, updateOrderStatus, createProduct, updateProduct, createCategory, deleteCategory } = require('../api-function/adminController');


router.route('/products')
    .post(protect, admin, createProduct); 

router.route('/products/:id')
    .put(protect, admin, updateProduct); 

router.route('/products/:id/stock')
    .put(protect, admin, updateProductStock); 
router.route('/categories')
    .post(protect, admin, createCategory);
    
router.route('/categories/:id')
    .delete(protect, admin, deleteCategory);


router.get('/orders', protect, admin, getAllOrders); 

router.put('/orders/:orderId/assign', protect, admin, assignDeliveryAgent);

router.put('/orders/:orderId/status', protect, admin, updateOrderStatus); 

router.route('/users/delivery')
    .get(protect, admin, getDeliveryAgents)
    .post(protect, admin, createDeliveryAgent);

module.exports = router;
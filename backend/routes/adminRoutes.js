const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');


const { createProduct, updateProduct } = require('../api-function/productController');

const { getAllOrders, getDeliveryAgents, assignDeliveryAgent, updateProductStock } = require('../api-function/adminController');

const { createCategory, deleteCategory } = require('../api-function/categoryController');


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

router.get('/users/delivery', protect, admin, getDeliveryAgents); 

module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { getCategories } = require('../api-function/categoryController');
const { getProducts, getProductById } = require('../api-function/productController');
const { createOrder, getOrdersByUser } = require('../api-function/orderController');


router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getCategories);

router.route('/orders')
    .post(protect, createOrder)
    .get(protect, getOrdersByUser);

module.exports = router;
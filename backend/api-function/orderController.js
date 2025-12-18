const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User'); 

const createOrder = asyncHandler(async (req, res) => {
   
    const { orderItems, shippingAddress, paymentMethod, totalPrice, deliverySlot } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items provided');
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
        res.status(400);
        throw new Error('Invalid shipping address');
    }

    if (!paymentMethod || !['Card', 'PayPal', 'COD'].includes(paymentMethod)) {
        res.status(400);
        throw new Error('Invalid payment method');
    }

    if (totalPrice === undefined || totalPrice < 0) {
        res.status(400);
        throw new Error('Invalid total price');
    }

    if (!deliverySlot) {
        res.status(400);
        throw new Error('Delivery slot is required');
    }

  
    for (const item of orderItems) {
        const product = await Product.findById(item.product);

        if (!product) {
            res.status(404);
            throw new Error(`Product not found for item: ${item.name || item.product}`);
        }

        if (product.stockQuantity < item.purchasedQuantity) {
            res.status(400);
            throw new Error(`Insufficient stock for product: ${product.name}. Available: ${product.stockQuantity}, requested: ${item.purchasedQuantity}`);
        }

        product.stockQuantity -= item.purchasedQuantity;
        await product.save();
    }
   
    const order = new Order({
        user: req.user._id, 
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        deliverySlot: new Date(deliverySlot),
        status: 'Pending', 
        isPaid: paymentMethod !== 'COD', 
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});


const getOrdersByUser = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id })
        .sort({ createdAt: -1 }) 
        .populate('orderItems.product', 'name images'); 
    res.json(orders);
});


const getAssignedOrders = asyncHandler(async (req, res) => {
   
    const orders = await Order.find({ deliveryAgent: req.user._id })
        .where('status').in(['Processing', 'Packed', 'Out for Delivery']) 
        .sort({ deliverySlot: 1 }); 

    res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    
    if (status === 'Delivered') {
        order.deliveredAt = Date.now();
    }
    order.status = status;
    
    await order.save();
    res.json({ message: `Order status updated to ${status}`, order });
});


module.exports = {
    createOrder,
    getOrdersByUser,
    getAssignedOrders,
    updateOrderStatus,
};
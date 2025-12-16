const asyncHandler = require('express-async-handler');
const User = require('../models/User'); 
const Order = require('../models/Order');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAllOrders = asyncHandler(async (req, res) => {
    
    const orders = await Order.find({})
        .populate('user', 'name email')
        .populate('deliveryAgent', 'name phone isAvailable');

    if (!orders) {
        res.status(404);
        throw new Error('No orders found');
    }

    res.json(orders);
});


const getDeliveryAgents = asyncHandler(async (req, res) => {
    
    const agents = await User.find({ role: 'delivery' }).select('-password'); 

    res.json(agents);
});

const assignDeliveryAgent = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { agentId } = req.body; 

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    
    
    const agent = await User.findOne({ _id: agentId, role: 'delivery' });
    if (!agent) {
        res.status(400);
        throw new Error('Invalid agent ID or user is not a delivery agent');
    }
    
    
    order.deliveryAgent = agentId;
    order.status = 'Processing';

    await order.save();

    res.status(200).json({
        message: `Order ${orderId} assigned to agent ${agent.name} successfully.`,
        order
    });
});


const updateProductStock = asyncHandler(async (req, res) => {
    const { stockQuantity } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (product) {
        
        if (stockQuantity < 0) {
            res.status(400);
            throw new Error('Stock quantity cannot be negative');
        }

        product.stockQuantity = stockQuantity;
        
        await product.save();
        res.json({ message: 'Stock updated successfully', product });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


module.exports = {
    getAllOrders,
    getDeliveryAgents,
    assignDeliveryAgent,
    updateProductStock,
    
};
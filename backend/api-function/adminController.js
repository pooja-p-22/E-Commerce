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

const createDeliveryAgent = asyncHandler(async (req, res) => {
    const { name, email, password, phone, isAvailable } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Name, email and password are required');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    const agent = await User.create({
        name,
        email,
        password,
        role: 'delivery',
        phone,
        isAvailable: typeof isAvailable === 'boolean' ? isAvailable : true,
    });

    res.status(201).json({
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        role: agent.role,
        phone: agent.phone,
        isAvailable: agent.isAvailable,
        createdAt: agent.createdAt,
    });
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


const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;
    
    const validStatuses = ['Pending', 'Processing', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'];
    
    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid order status');
    }
    
    const order = await Order.findById(orderId);
    
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    
    order.status = status;
    
    if (status === 'Delivered') {
        order.deliveredAt = Date.now();
    }
    
    await order.save();
    
    res.json({ message: `Order status updated to ${status}`, order });
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, description, unitPrice, unitType, stockQuantity, categoryId, isOrganic } = req.body;

    if (!name || !brand || !description || unitPrice === undefined || !unitType || stockQuantity === undefined || !categoryId) {
        res.status(400);
        throw new Error('Missing required product fields');
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    const product = new Product({
        name,
        brand,
        description,
        unitPrice,
        unitType,
        stockQuantity,
        category: categoryId,
        isOrganic: isOrganic || false,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, brand, description, unitPrice, unitType, stockQuantity, categoryId, isOrganic } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.description = description || product.description;
        product.unitPrice = unitPrice !== undefined ? unitPrice : product.unitPrice;
        product.unitType = unitType || product.unitType;
        product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
        product.category = categoryId || product.category;
        product.isOrganic = isOrganic !== undefined ? isOrganic : product.isOrganic;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

const createCategory = asyncHandler(async (req, res) => {
    const { name, slug } = req.body;

    if (!name || !slug) {
        res.status(400);
        throw new Error('Category name and slug are required');
    }

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({ name, slug });
    res.status(201).json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        await Category.deleteOne({ _id: category._id });
        res.json({ message: 'Category removed' });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

module.exports = {
    getAllOrders,
    getDeliveryAgents,
    createDeliveryAgent,
    assignDeliveryAgent,
    updateProductStock,
    updateOrderStatus,
    createProduct,
    updateProduct,
    createCategory,
    deleteCategory,
};
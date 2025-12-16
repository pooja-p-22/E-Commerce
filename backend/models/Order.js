const mongoose = require('mongoose');


const orderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    unitType: { type: String, required: true },
    purchasedQuantity: { type: Number, required: true }, 
    priceAtPurchase: { type: Number, required: true }, 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
});

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    deliveryAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    orderItems: [orderItemSchema], 
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    deliverySlot: { 
        type: Date,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Card', 'PayPal', 'COD']
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    deliveryInstructions: {
        type: String, 
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
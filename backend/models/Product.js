// /models/Product.js

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{ 
        type: String,
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    unitPrice: {
        type: Number,
        required: true,
        default: 0
    },
    unitType: { 
        type: String,
        required: true,
        enum: ['kg', 'g', 'ml', 'liter', 'unit', 'pack'] 
    },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0 
    },
    isOrganic: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    manufacturerDate: {
        type: Date,
    },
    expiryDate: {
        type: Date,
    },
    batchNumber: {
        type: String,
    },
    seller: {
        type: String,
    },
    storageInstructions: {
        type: String,
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

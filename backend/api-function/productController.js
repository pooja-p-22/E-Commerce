const asyncHandler = require('express-async-handler');
const Product = require('../models/Product'); // Assuming Product model path
const Category = require('../models/Category'); // Assuming Category model path

const getProducts = asyncHandler(async (req, res) => {
   
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i', 
              },
          }
        : {};

    const products = await Product.find({ ...keyword }).populate('category', 'name slug'); // Show category name/slug
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


const createProduct = asyncHandler(async (req, res) => {
   
    const { name, brand, description, unitPrice, unitType, stockQuantity, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    const product = new Product({
        user: req.user._id, 
        name,
        brand,
        description,
        unitPrice,
        unitType,
        stockQuantity,
        category: categoryId,
       
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


const updateProduct = asyncHandler(async (req, res) => {
    const { name, brand, description, unitPrice, unitType, stockQuantity, categoryId } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        
        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.description = description || product.description;
        product.unitPrice = unitPrice || product.unitPrice;
        product.unitType = unitType || product.unitType;
        product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
        product.category = categoryId || product.category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
};
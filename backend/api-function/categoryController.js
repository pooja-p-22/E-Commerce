const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');


const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
});


const createCategory = asyncHandler(async (req, res) => {
    const { name, image, slug } = req.body;

    if (!name || !slug) {
        res.status(400);
        throw new Error('Category name and slug are required');
    }

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({ name, image, slug });
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
    getCategories,
    createCategory,
    deleteCategory
};
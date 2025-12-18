const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const connectDB = require('./db-connect/db');

dotenv.config();

const checkData = async () => {
  try {
    await connectDB();
    
    const categories = await Category.find({});
    const products = await Product.find({}).populate('category');
    
    console.log('Categories found:', categories.length);
    categories.forEach(cat => console.log(`- ${cat.name} (${cat.slug})`));
    
    console.log('\nProducts found:', products.length);
    products.forEach(prod => console.log(`- ${prod.name} (${prod.category?.name || 'No category'})`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkData();
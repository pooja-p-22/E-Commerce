const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db-connect/db'); 
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

dotenv.config();

connectDB(); 

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*'
    : '*',
  credentials: true
};
app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, '../frontend/FreshCart/public'))); 

app.get('/', (req, res) => {
    res.send('API is running for Grocery E-Commerce!');
});

const API_PREFIX = '/api/v1';
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/customer`, customerRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes); 
app.use(`${API_PREFIX}/delivery`, deliveryRoutes); 

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
}

// Export for Vercel
module.exports = app;
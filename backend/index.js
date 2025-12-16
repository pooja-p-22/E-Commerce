const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Assuming you have a db connection file
const cors = require('cors');


const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');


dotenv.config();


connectDB(); 

const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 


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

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
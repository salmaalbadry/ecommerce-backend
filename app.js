require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());

// check if route is working
app.get('/', (req, res) => {
  res.json({ success: true, message: 'E-Commerce API is working' });
});

// importing routs in my main app.js file to use them 
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoriesRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 404 handler if the route is unnregistered
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Central error middleware 
app.use(errorHandler);

module.exports = app;
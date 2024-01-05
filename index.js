const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// API routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  errorHandler(err, res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

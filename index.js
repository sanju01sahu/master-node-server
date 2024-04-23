const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");

const userRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
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

//Booksbuddies-task-manager
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  errorHandler(err, res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

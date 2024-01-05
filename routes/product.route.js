const express = require('express');
const { check } = require('express-validator');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { authenticateUser } = require('../middlewares/auth.middleware');

const router = express.Router();

// GET /api/products
router.get('/products', getProducts);

// GET /api/products/:id
router.get('/products/:id', getProductById);

// POST /api/products
router.post(
  '/products',
  addProduct
);

// PUT / PATCH /api/products/:id
router.put(
  '/products/:id',
  updateProduct
);

// DELETE /api/products/:id
router.delete('/products/:id', authenticateUser, deleteProduct);

module.exports = router;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  picture: { type: String, trim: true },
  description: { type: String },
  gender: { type: String, enum: ['male', 'female'], required: true },
  category: { type: String, enum: ['makeup', 'skincare', 'haircare'], required: true },
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;

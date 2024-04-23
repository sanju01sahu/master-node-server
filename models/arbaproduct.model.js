const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, trim: true },
  owner: { type: String, required: true, maxlength: 50 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model('arbaProduct', productSchema);

module.exports = ProductModel;

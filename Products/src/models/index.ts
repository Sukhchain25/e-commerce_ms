import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  strikePrice: { type: String, required: true },
  discount: { type: String },
  ratings: { type: Number, min: 0, max: 5 },
  inStock: { type: Boolean, required: true },
  quanityInStock: { type: Number, required: true },
});

const Product = mongoose.model('Products', ProductSchema);

export default Product;

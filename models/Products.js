import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: [String], required: true },
  color: { type: [String] },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true },
}, { timestamps: true });

// मॉडल पहले से मौजूद है या नहीं, इसे सुरक्षित रूप से चेक करें
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;

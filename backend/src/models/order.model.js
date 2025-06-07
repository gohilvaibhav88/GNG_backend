import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Item name (copied at order time)
  price: { type: Number, required: true },          // Price at time of order
  quantity: { type: Number, required: true },
  category: { type: String, required: true },       // 'lunch', 'chinese', etc.
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  canteen: { type: mongoose.Schema.Types.ObjectId, ref: 'Canteen', required: true },

  items: [orderItemSchema],                         // Embedded item list

  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Delivered'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('CanteenOrder', orderSchema);

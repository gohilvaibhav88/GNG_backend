import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  availability: { type: Boolean, default: true }
}, { _id: false }); // Prevent Mongoose from auto-generating _id for subdocuments

const canteenMenuSchema = new mongoose.Schema({
  canteen: { type: mongoose.Schema.Types.ObjectId, ref: 'Canteen', required: true },
  
  lunch: [itemSchema],
  chinese: [itemSchema],
  breakfast: [itemSchema],
  specialFood: [itemSchema]

}, { timestamps: true });

export default mongoose.model('CanteenMenu', canteenMenuSchema);

import mongoose from 'mongoose';

const canteenSchema = new mongoose.Schema({
  canteenName: { type: String, required: true },              // Updated from 'name'
  canteenAddress: { type: String, required: true },           // New field
  collegeName: { type: String, required: true },              // New field
  licenseImage: { type: String },                             // URL or path to image
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Existing field
  ownerName: { type: String, required: true },                // New field
  ownerPhone: { type: String, required: true },
  ownerEmail:{ type: String, required: true },              // New field
  ownerPhoto: { type: String },                               // URL or path to image
  canteenPhoto: { type: String },                             // URL or path to image
  aadharCardNumber: { type: String, required: true },         // New field (Aadhaar)
}, { timestamps: true });

export default mongoose.model('Canteen', canteenSchema);

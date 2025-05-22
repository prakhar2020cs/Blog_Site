import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    image: {
      type: String,
      default: '' // Default empty string for users without an image
    }
  },
  {
    collection: "admin", 
  },
  { timestamps: true }
);

export default mongoose.models.admin || mongoose.model('admin', adminSchema);

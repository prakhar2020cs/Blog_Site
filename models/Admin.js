
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
  },
  {
    collection: "admin", 
  },
  { timestamps: true }
);

export default mongoose.models.admin || mongoose.model('admin', adminSchema);

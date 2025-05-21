
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    image:{
        type:String
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Content is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', postSchema);

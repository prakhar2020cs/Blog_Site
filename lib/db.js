
import mongoose from 'mongoose';








 const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

 const isConnnected= await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  
};



export default connectDB;

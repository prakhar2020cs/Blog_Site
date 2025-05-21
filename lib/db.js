
import mongoose from 'mongoose';








 const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  console.log( "connection str", process.env.MONGO_URI);
 const isConnnected= await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
console.log( "connection status", isConnnected);
  
};



export default connectDB;

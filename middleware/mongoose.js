
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI ||'mongodb+srv://himanshudiktiya9:himanshudiktiyaji@cluster0.yiwv3.mongodb.net/' ;
const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 40000 
  
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    throw new Error('MongoDB connection error');
  }
};

export default connectDb;

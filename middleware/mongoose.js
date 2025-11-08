import mongoose from 'mongoose';

const connectDb = async () => {
 
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; 
  }
};

export default connectDb;

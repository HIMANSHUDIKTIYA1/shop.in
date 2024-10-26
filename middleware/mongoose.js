import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connection.readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // यह त्रुटि को ऊपर भेज देगा ताकि उसे सही तरीके से संभाला जा सके
  }
};

export default connectDb;

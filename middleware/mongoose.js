import mongoose from 'mongoose';
const Mongo = async () =>{
  await axios.get('/myDatabase.json');
}
const connectDb = async () => {

  if (mongoose.connection.readyState) {
    return;
  }
  try {
    await mongoose.connect(Mongo);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // यह त्रुटि को ऊपर भेज देगा ताकि उसे सही तरीके से संभाला जा सके
  }
};

export default connectDb;

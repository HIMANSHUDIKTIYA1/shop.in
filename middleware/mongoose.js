import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    // पहले से कनेक्टेड हैं
    return;
  }
  
  // कनेक्शन स्ट्रिंग को पर्यावरण चर से प्राप्त करें
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MongoDB URI is not defined');
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;


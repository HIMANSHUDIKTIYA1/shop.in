
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI ||'mongodb+srv://himanshudiktiya9:himanshudiktiyaji@cluster0.yiwv3.mongodb.net/mydatabase?retryWrites=true&w=majority' ;
const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
       useNewUrlParser: true,       
            useUnifiedTopology: true,   
            serverSelectionTimeoutMS: 40000, 
    
  
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
     setTimeout(connectDb, 10000);  
    
  }
};

export default connectDb;

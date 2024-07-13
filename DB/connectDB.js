import mongoose from 'mongoose'

const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('connected to mongodb');
  } catch (error) {
    console.log('Error in connecting to MongoDB',error.message);

  }
}

export default connectDB
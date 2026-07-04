//require('dotenv').config(); (still not sure if this should be added here or in the app.js file)
//this file to connect with db
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn  = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

  } catch (err){
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
// runtime mongo error listener
mongoose.connection.on('error', (err) => {
  console.error('MongoDB Runtime Error:', err.message);
});

module.exports = connectDB;
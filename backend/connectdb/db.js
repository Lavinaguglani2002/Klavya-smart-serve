const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectdb = async () => {
  try {
    const mongoURI = process.env.MONGO_URL;  
    if (!mongoURI) {
      console.log('Mongo URI is missing');
      return;
    }
    await mongoose.connect(mongoURI);
    console.log('Database connected');
  } catch (error) {
    console.log('DB Connection Error:', error);
  }
};

module.exports = connectdb;

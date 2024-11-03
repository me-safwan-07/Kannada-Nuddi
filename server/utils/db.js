import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { keys } from '../config/keys.js';

dotenv.config();
const { database } = keys; // This variable is not used in your code. Consider removing it if unnecessary.

const setupDB = async () => {
  try {
    // Ensure the database URL is defined
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('Database URL is not defined in the configuration.');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Optionally rethrow the error or handle it as needed
    // throw error; // Uncomment if you want to rethrow the error
  }
};

export default setupDB;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User data with pre-hashed password
const userData = {
  name: 'Test User',
  email: 'test@example.com',
  password: '$2b$12$ihWsCQidIfdC1zjW9M7F0eZofVg5SI0BLkKKl3hxSaodJ8eypPGR6', // password123
  role: 'patient',
  walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
};

// Create or update user
const user = await User.findOneAndUpdate(
  { email: userData.email },
  userData,
  { new: true, upsert: true, setDefaultsOnInsert: true }
);

console.log('User created/updated:', user);
process.exit(0);

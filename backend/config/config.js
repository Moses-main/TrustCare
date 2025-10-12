import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 30,
  
  // Database Configuration
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/dhrs',
  
  // Email Configuration
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || 'your_sendgrid_api_key',
  
  // Frontend URL for email links
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // IPFS Configuration
  IPFS_HOST: process.env.IPFS_HOST || 'ipfs.infura.io',
  IPFS_PORT: process.env.IPFS_PORT || 5001,
  IPFS_PROTOCOL: process.env.IPFS_PROTOCOL || 'https',
  
  // Blockchain Configuration
  WEB3_PROVIDER: process.env.WEB3_PROVIDER || 'http://localhost:8545',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || '0xYourContractAddress',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};

export const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  JWT_EXPIRE,
  JWT_COOKIE_EXPIRE,
  MONGO_URI,
  EMAIL_FROM,
  SENDGRID_API_KEY,
  FRONTEND_URL,
  IPFS_HOST,
  IPFS_PORT,
  IPFS_PROTOCOL,
  WEB3_PROVIDER,
  CONTRACT_ADDRESS,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX,
  CORS_ORIGIN
} = process.env;

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4500,
  
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 30,
  
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/trustcare',
  
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  IPFS_HOST: process.env.IPFS_HOST || 'ipfs.infura.io',
  IPFS_PORT: process.env.IPFS_PORT || 5001,
  IPFS_PROTOCOL: process.env.IPFS_PROTOCOL || 'https',
  
  WEB3_PROVIDER: process.env.WEB3_PROVIDER || 'http://localhost:8545',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || '0xYourContractAddress',
  
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
  
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173'
};

export const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  JWT_EXPIRE,
  JWT_COOKIE_EXPIRE,
  MONGO_URI,
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

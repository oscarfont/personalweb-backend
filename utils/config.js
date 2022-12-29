import { config } from 'dotenv';
config();
export const cryptoKey = process.env.CRYPTO_KEY;
export const jwtSecret = process.env.JWT_SECRET;
export const email = process.env.EMAIL;
export const apiKey = process.env.API_KEY;
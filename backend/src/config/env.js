import { configDotenv } from "dotenv";

configDotenv({quiet:"true"})


export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  JWT_TOKEN: process.env.JWT_TOKEN,
  ADMIN_EMAIL:process.env.ADMIN_EMAIL?.split(",").map(email => email.trim()) || [],
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY:process.env.STRIPE_PUBLISHABLE_KEY,
  GROQ_API_KEY:process.env.GROQ_API_KEY,
  CLIENT_URL:process.env.CLIENT_URL

};
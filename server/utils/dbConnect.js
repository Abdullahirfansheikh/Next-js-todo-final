// @ts-nocheck
// utils/dbConnect.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedDb = null;

async function dbConnect() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedDb = db;
    console.log("db connected");
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Unable to connect to the database');
  }
}

export default dbConnect;



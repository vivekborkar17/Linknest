// lib/mongodb.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

try {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    if (!client) {
      client = new MongoClient(uri, options);
    }
    clientPromise = client.connect();
  }
} catch (error) {
  console.error("Failed to connect to MongoDB:", error.message);
  throw new Error("Failed to connect to MongoDB");
}

export default clientPromise;

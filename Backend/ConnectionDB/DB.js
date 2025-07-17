const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let db;
async function connectToDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("SmartCart");
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
    }
  }
  return db;
}


module.exports = { connectToDB };
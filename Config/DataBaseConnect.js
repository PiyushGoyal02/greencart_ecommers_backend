// It's Latest Version

const mongoose = require("mongoose");
require("dotenv").config();

const DBConnect = async () => {
  try {
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error("MONGODB_URI not found");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = { DBConnect };

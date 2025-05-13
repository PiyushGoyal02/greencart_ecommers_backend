const cloudinary = require("cloudinary").v2;   // ( .v2 ) We are using cloudinary version 2
require("dotenv").config();

// Get and Set Cloudinary Important Details
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;

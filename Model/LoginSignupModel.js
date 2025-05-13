// Admin And User Login and Signup Model and Also Userprofile Model

const mongoose = require("mongoose");

const UserAuth = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    surname: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },

    accountType: {
      type: String,
      enum: ['admin', 'user'],
    },

    address: {
      type: String,
    },

    pincode: {
      type: String,
    },

    landmark: {
      type: String,
    },

    number: {
      type: String,
    },

    houseNum: {
      type: String,
    },

    state: {
      type: String,
    },

    country: {
      type: String,
    },

    type: {
      type: String,
    }
  }
);

module.exports = mongoose.model("UserAuth", UserAuth);

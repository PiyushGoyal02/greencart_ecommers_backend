// When order placed, the order details are stored in the database.

const mongoose = require("mongoose");

// Tracking schema
const trackingSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Order Schema
const productOrder = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    cartId: {
      type: String,
    },
    cartItems: [
      {
        productId: {
          type: String,
        },
        productName: {
          type: String,
        },
        productPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
    },
    address: {
      type: String,
    },
    razorpayOrderId: {
      type: String,
    },
    orderAt: {
      type: Date,
      default: Date.now,
    },
    payment: {
      method: {
        type: String,
        default: "COD",
      },
    },
    tracking: [trackingSchema],
  }
);

module.exports = mongoose.model("Order", productOrder);

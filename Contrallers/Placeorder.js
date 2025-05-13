require("dotenv").config();
const Razorpay = require("razorpay");
const OrderModel = require("../Model/ProductOrderModel");


// get RazorPay key form .env file
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.placeOrder = async (req, res) => {
  try {
    const { userId, cartId, cartItems, totalAmount, address, payment } = req.body;

    // Basic validation
    if (!userId || !cartId || !Array.isArray(cartItems) || cartItems.length === 0 || !totalAmount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid required fields.",
      });
    }

    const amountInPaise = Math.round(totalAmount * 100); // Convert to paise for Razorpay

    // Create Razorpay order only if method is not COD
    let razorpayOrder = null;
    const paymentMethod = payment?.method || "COD";

    if (paymentMethod !== "COD") {
      razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,   // Create Random receipt number
      });
    }

    // Save order
    const newOrder = new OrderModel({
      userId,
      cartId,
      cartItems,
      totalAmount,
      address,
      razorpayOrderId: razorpayOrder?.id || null,
      status: "Pending", 
      payment: {
        method: paymentMethod,
      },
      tracking: [
        {
          status: "Pending",
        },
      ],
    });

    await newOrder.save();

    // Successfully Order Placed
    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder?.id || null,
      amount: totalAmount,
      orderData: newOrder,
    });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order. Please try again.",
    });
  }
};

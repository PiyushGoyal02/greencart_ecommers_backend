const cartItemModel = require("../Model/CartItemModel");

exports.cartItem = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;   // Get Cart Data from frontend

    if (!userId || !products || !totalAmount || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All details aren't getting. Please check!",
      });
    }

    // Create New Cart Item
    const newCart = new cartItemModel({
      userId,
      products,
      totalAmount
    });
    console.log(newCart, "NewCartSection");

    await newCart.save();

    res.status(201).json({
      success: true,
      message: "Cart Items Successfully Updated",
      data: newCart,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Your items aren't adding to the cart database. Please try again!",
    });
  }
};

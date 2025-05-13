const CartModelSchema = require("../Model/CartItemModel");

exports.getCartItemData = async (req, res) => {
  try {

    // Get Userid and products from backend
    const cartData = await CartModelSchema.find({}, 'userId products');

    if (!cartData || cartData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No cart data found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart data retrieved successfully.",
      data: cartData, // Send the data too
    });

  } catch (error) {
    console.error("Error fetching cart data:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart data. Please try again!",
    });
  }
};

const orderModel = require("../Model/ProductOrderModel");

exports.getOrderData = async (req, res) => {
    try {
        // Include tracking data also
        const response = await orderModel.find({}, '_id cartItems address totalAmount payment.method orderAt status userId tracking');

        if (!response || response.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No orders found",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: response
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

const ProductModel = require("../Model/ProductOrderModel");

exports.updateTracking = async (req, res) => {
    try {
        const { status, orderId } = req.body;

        const order = await ProductModel.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.tracking.push({ status, timestamp: new Date() });
        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Tracking updated successfully",
            tracking: order.tracking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Tracking not updated.",
            error: error.message
        });
    }
};

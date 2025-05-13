const allProductModel = require("../Model/AdminAddProducts");

exports.getAllproducts = async (req, res) => {
    try {
        // Fetch products with specific fields only
        const getAllProducts = await allProductModel.find({}, 'productName descriptionText productprice productsquantity category productImages');
                                                
        // Check if products exist
        if (!getAllProducts || getAllProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"                                                                              
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: getAllProducts
        });

    } catch (error) {
        console.error("Error getting products:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later."
        });
    }
};

const addproductsModel = require("../../Model/AdminAddProducts");

exports.addProducts = async (req, res) => {
  try {

    // Get data form Frontend 
    const {
      productName,
      descriptionText,
      productprice,
      productsquantity,
      category,
    } = req.body;

    // Check required fields
    if (
      !req.file ||
      !productName ||
      !descriptionText ||
      !productprice ||
      !productsquantity ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Cloudinary returns full public URL in req.file.path
    const imageUrl = req.file.path;

    // Add/Create product Details In Backend
    const newProduct = new addproductsModel({
      productName,
      descriptionText,
      productprice,
      productsquantity,
      category,
      productImages: imageUrl,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });

  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, product not added",
    });
  }
};

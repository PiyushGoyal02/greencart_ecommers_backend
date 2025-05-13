// When Admin adds products, we need to store the products in the database.

const mongoose = require("mongoose");

const addProducts = new mongoose.Schema (
    {
        productName: {
            type: String,
        },

        descriptionText: {
            type: String,
        },

        productprice : {
            type: String,
        },

        productsquantity : {
            type: String,
        },

        category : {
            type: String,
        },

        productImages: {
            type: String,
        },
    }
)

module.exports = mongoose.model("addProducts", addProducts);
const express = require("express")
const route = express.Router();

const { getCartItemData } = require("../Contrallers/getAllCartDetails")

route.get("/getCartData", getCartItemData)

module.exports = route
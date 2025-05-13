const express = require("express");
const route = express.Router();

const { cartItem } = require("../Contrallers/CartItems")

route.post("/cartItemAdd", cartItem)

module.exports = route;
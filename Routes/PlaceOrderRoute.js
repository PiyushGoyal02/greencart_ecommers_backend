const express = require("express")
const route = express.Router();

const { placeOrder } = require("../Contrallers/Placeorder")
route.post("/placeOrder", placeOrder)

module.exports = route
const express = require("express")
const route = express.Router();

const { getOrderData } = require("../Contrallers/getAllOrderData")
route.get("/getAllorderData", getOrderData)

module.exports = route;
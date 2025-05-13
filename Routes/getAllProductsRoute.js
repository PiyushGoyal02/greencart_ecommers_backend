const express = require("express")
const route = express.Router();

const { getAllproducts } = require("../Contrallers/getAllProducts")

route.get("/getAllProducts", getAllproducts)

module.exports = route
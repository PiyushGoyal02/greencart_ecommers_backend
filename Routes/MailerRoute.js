const express = require("express")
const route = express.Router()

const { sendMail } = require("../Contrallers/SendMail")

route.post("/sendMail", sendMail)

module.exports = route
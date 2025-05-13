const express = require("express")
const route = express.Router();

const {Signup, Login, adminLogin} = require("../Contrallers/Auth")

route.post("/signup", Signup)
route.post("/login", Login)
route.post("/adminlogin", adminLogin)

module.exports = route;
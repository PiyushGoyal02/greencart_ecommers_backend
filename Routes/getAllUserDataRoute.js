const express = require("express")
const route = express.Router();

const { allUsersDetails } = require("../Contrallers/getAllUsersData")

route.get("/allUserDetails", allUsersDetails)

module.exports = route
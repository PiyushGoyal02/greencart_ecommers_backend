const express = require("express");
const route = express.Router();

const { profileDetails } = require("../Contrallers/profileDetails")

route.post("/profileDetails", profileDetails)

module.exports = route;
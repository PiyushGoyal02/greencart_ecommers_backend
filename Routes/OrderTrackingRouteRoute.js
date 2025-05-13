const express = require("express");
const route = express.Router();

const { updateTracking } = require("../Contrallers/UpdateTrackingProduct")
route.post("/updateTracking", updateTracking) 

module.exports = route;
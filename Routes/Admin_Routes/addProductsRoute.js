const express = require("express");
const route = express.Router();

const upload = require("../../Middleware/CloudinaryMiddleware"); // import your multer-cloudinary config
const { addProducts } = require("../../Contrallers/Admin_Side/addProducts"); // fix typo in 'Controllers'

route.post("/addProducts", upload.single("productImage"), addProducts);

module.exports = route;

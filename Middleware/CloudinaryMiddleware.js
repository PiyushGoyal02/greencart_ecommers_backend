const multer = require("multer");  // It's a middleware that runs after the image is updated on the frontend UI
const { CloudinaryStorage } = require("multer-storage-cloudinary");  // It works to save our image directly on Cloudinary, not in the local file
const cloudinary = require("../Config/CloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce_products",    // This is Folder Name in cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],    // Which type of image path should we use when uploading images?
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
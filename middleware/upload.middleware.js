// middleware/upload.js
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_images", 
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const parser = multer({ storage });

module.exports = parser;

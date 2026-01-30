const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadProfileImage = (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    { folder: "profiles" },
    (err, result) => {
      if (err) return next(err);
      req.file.path = result.secure_url; // <-- assign Cloudinary URL
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const Authcontrollers = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");



const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/avatars");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const avatarFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: avatarFileFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
});



router.post("/register", Authcontrollers.Registerpage);
router.post("/login", Authcontrollers.Loginpage);
router.post("/forgotpassword", Authcontrollers.forgotPassword);
router.post("/reset-password/:token", Authcontrollers.resetPassword);

router.get("/me", authenticate, Authcontrollers.getMe);
router.get("/profile", authenticate, Authcontrollers.userprofile);



router.put(
  "/updateprofile",
  authenticate,
  avatarUpload.single("avatar"),
  Authcontrollers.updateProfile
);

module.exports = router;

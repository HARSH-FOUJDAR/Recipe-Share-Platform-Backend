const express = require("express");
const router = express.Router();
const path = require("path");
const Authcontrollers = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const multer = require("multer");

router.post("/register", Authcontrollers.Registerpage);
router.post("/login", Authcontrollers.Loginpage);
router.post("/forgotpassword", Authcontrollers.forgotPassword);
router.post("/reset-password/:token", Authcontrollers.resetPassword);
router.get("/me", authenticate, Authcontrollers.getMe);

const avtarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/avatars");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${Math.random()}${ext}`);
  },
});

router.get("/profile", authenticate, Authcontrollers.userprofile);
router.put("/updateprofile", authenticate, Authcontrollers.updateProfile);

module.exports = router;

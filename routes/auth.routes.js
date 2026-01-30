const express = require("express");
const router = express.Router();
const Authcontrollers = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware"); // <--- Check filename: upload.middleware.js

router.post(
  "/register",
  upload.single("profileImage"),
  Authcontrollers.Registerpage,
);
router.post("/login", Authcontrollers.Loginpage);
router.post("/forgotpassword", Authcontrollers.forgotPassword);
router.post("/reset-password/:token", Authcontrollers.resetPassword);
router.get("/me", authenticate, Authcontrollers.getMe);
router.get("/profile", authenticate, Authcontrollers.userprofile);
router.put(
  "/updateprofile",
  authenticate,
  upload.single("profileImage"),
  Authcontrollers.updateProfile,
);

module.exports = router;

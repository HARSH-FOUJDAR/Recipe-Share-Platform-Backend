const express = require("express");
const router = express.Router();
const path = require("path");
const Authcontrollers = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/register", Authcontrollers.Registerpage);
router.post("/login", Authcontrollers.Loginpage);
router.post("/forgotpassword", Authcontrollers.forgotPassword);
router.post("/reset-password/:token", Authcontrollers.resetPassword);
router.get("/me", authenticate, Authcontrollers.getMe);



router.get("/profile", authenticate, Authcontrollers.userprofile);
router.put("/updateprofile", authenticate, Authcontrollers.updateProfile);

module.exports = router;

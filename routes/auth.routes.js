const express = require("express");
const router = express.Router();
const Authcontrollers = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");


router.post("/register", upload.single("profileImage"), Registerpage);
router.post("/login", Authcontrollers.Loginpage);
router.post("/forgotpassword", Authcontrollers.forgotPassword);

//  Reset password using token
router.post("/reset-password/:token", Authcontrollers.resetPassword);
router.get("/me", authenticate, Authcontrollers.getMe);

router.get("/profile", authenticate, Authcontrollers.userprofile);
router.put("/updateprofile", authenticate, Authcontrollers.updateProfile);
module.exports = router;

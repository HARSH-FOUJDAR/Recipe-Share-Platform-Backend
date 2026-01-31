const express = require("express");
const router = express.Router();
const followControllers = require("../controllers/follow.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/follow", authenticate, followControllers.followUser);
router.post("/unfollow", authenticate, followControllers.unfollowUser);

module.exports = router;
  
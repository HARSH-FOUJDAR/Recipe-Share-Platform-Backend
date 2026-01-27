const express = require("express");
const router = express.Router();
const followControllers = require("../controllers/follow.controller");
const authenticate = require("../middleware/auth.middleware");

// Follow a user
router.post("/follow", authenticate, followControllers.followUser);

// Unfollow a user
router.post("/unfollow", authenticate, followControllers.unfollowUser);

// Get followers of a user
router.get("/followers/:userId", followControllers.getFollowers);

// Get following of a user
router.get("/following/:userId", followControllers.getFollowing);

module.exports = router;
  
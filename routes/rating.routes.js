const express = require("express");
const router = express.Router();
const RatingControllers = require("../controllers/rating.controller");
const authenticate = require("../middleware/auth.middleware");
//Add teh rating
router.post("/rating", authenticate, RatingControllers.addRating);

//get rating for recipes
router.get("/:recipeId", RatingControllers.getReting);

module.exports = router;

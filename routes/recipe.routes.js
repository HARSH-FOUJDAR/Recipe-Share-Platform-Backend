const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/recipe.controller");
const authenticate = require("../middleware/auth.middleware");
const authorizeRecipeOwner = require("../middleware/authorizeRecipeOwner");

// CREATE → sirf login required
router.post("/", authenticate, RecipeController.createRecipe);

// PUBLIC ROUTES
router.get("/", RecipeController.getAllRecipe);
router.get("/:id",authenticate, RecipeController.getRecipeById);

// UPDATE → login + owner
router.put(
  "/:id",
  authenticate,
  authorizeRecipeOwner,
  RecipeController.updateById,
);

// DELETE → login + owner
router.delete(
  "/:id",
  authenticate,
  authorizeRecipeOwner,
  RecipeController.deleteRecipeById ,
);
// LIKE & SHARE
router.post("/:id/like", authenticate, RecipeController.toggleLike);
router.post("/:id/share", authenticate, RecipeController.shareRecipe);

module.exports = router;

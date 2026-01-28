const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/recipe.controller");
const authenticate = require("../middleware/auth.middleware");
const authorizeRecipeOwner = require("../middleware/authorizeRecipeOwner");

// CREATE
router.post("/", authenticate, RecipeController.createRecipe);

// READ
router.get("/", RecipeController.getAllRecipe);
router.get("/:id", authenticate, RecipeController.getRecipeById);

// UPDATE
router.put(
  "/:id",
  authenticate,
  authorizeRecipeOwner,
  RecipeController.updateById
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  authorizeRecipeOwner,
  RecipeController.deleteRecipeById
);

// LIKE & SHARE
router.post("/:id/like", authenticate, RecipeController.tooglelike);
router.post("/:id/share", authenticate, RecipeController.shareRecipe);

module.exports = router;

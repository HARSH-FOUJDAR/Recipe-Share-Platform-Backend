const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/recipe.controller");
const authenticate = require("../middleware/auth.middleware");
const authorizeRecipeOwner = require("../middleware/authorizeRecipeOwner");

router.post("/", authenticate, RecipeController.createRecipe);

router.get("/myRecipe", authenticate, RecipeController.getMyRecipes);
router.get("/", RecipeController.getAllRecipe);
router.get("/:id", authenticate, RecipeController.getRecipeById);

router.put(
  "/:id",
  authenticate,
  authorizeRecipeOwner,
  RecipeController.updateById,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRecipeOwner,
  RecipeController.deleteRecipeById,
);

router.post("/:id/like", authenticate, RecipeController.toggleLike);
router.post("/:id/share", authenticate, RecipeController.shareRecipe);

module.exports = router;

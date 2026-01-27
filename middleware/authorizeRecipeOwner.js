const Recipe = require("../models/Recipe.model");

const authorizeRecipeOwner = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the owner of this recipe" });
    }
    req.recipe = recipe;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authorizeRecipeOwner;

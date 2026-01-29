const RecipeModel = require("../models/Recipe.model");

exports.createRecipe = async (req, res) => {
  try {
    const {
      title,
      ingredients,
      instructions,
      steps,
      cookTime,
      servings,
      photos,
      videoTutorial,
    } = req.body;

    if (
      !title ||
      !ingredients ||
      !instructions ||
      !steps ||
      !cookTime ||
      !servings
    ) {
      return res.status(400).json({ message: "Required Field  are Missing" });
    }
    const newRecipe = new RecipeModel({
      title,
      ingredients,
      instructions,
      steps,
      cookTime,
      photos,
      servings,
      videoTutorial,
      createdBy: req.user._id,
    });

    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllRecipe = async (req, res) => {
  try {
    const recipes = await RecipeModel.find().populate(
      "createdBy",
      "username email",
    );
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id).populate(
      "createdBy",
      "username email",
    );
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteRecipeById = async (req, res) => {
  try {
    await req.recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateById = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "ingredients",
      "instructions",
      "steps",
      "cookTime",
      "photos",
      "servings",
      "videoTutorial",
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        req.recipe[field] = req.body[field];
      }
    });
    await req.recipe.save();
    res.json({
      message: "Recpies update succesffully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.shareRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.share += 1;
    await recipe.save();

    res.json({
      shareCount: recipe.share,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleLike = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id.toString();

  try {
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const index = recipe.like.findIndex((uid) => uid.toString() === userId);

    if (index === -1) {
      recipe.like.push(userId);
    } else {
      recipe.like.splice(index, 1);
    }

    await recipe.save();

    res.json({
      likeCount: recipe.like.length,
      liked: index === -1,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyRecipes = async (req, res) => {
  try {
    const userId = req.user._id;

    const myRecipe = await RecipeModel.find({
      createdBy: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      recipes: myRecipe,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

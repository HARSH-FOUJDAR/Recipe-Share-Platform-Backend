const FavoriteModel = require("../models/Favorite.model");

exports.toggleFavrouits = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
    const existing = await FavoriteModel.findOne({
      user: userId,
      recipe: recipeId,
    });

    if (existing) {
      await existing.deleteOne();
      return res
        .status(200)
        .json({ favorited: false, message: "Removed fromn favrouits" });
    } else {
      const favrouits = new FavoriteModel({ user: userId, recipe: recipeId });
      await favrouits.save();
      return res.status(200).json({
        favorited: true,
        message: "Added to favrouits",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getFavrouits = async (req, res) => {
  try {
    const userId = req.user.id;
    const favrouits = await FavoriteModel.find({
      user: userId,
    }).populate("recipe");

    res.status(200).json({
      favorites: favrouits.map((f) => f.recipe),
      message: "Favorites fetched successfully",
    });
  } catch (err) {
    console.error("Server error", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.DeleteFav = async (req, res) => {
  try {
    const { id } = req.params; 
    const deleted = await FavoriteModel.findByIdAndDelete(id); 

    if (!deleted) {
      return res.status(404).json({ 
        message: "Favorites not Found",
      });
    }

    res.status(200).json({
      message: "Recipe Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
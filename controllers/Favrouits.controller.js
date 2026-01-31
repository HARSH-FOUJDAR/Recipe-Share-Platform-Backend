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
    const favrouits = await FavoriteModel.find({ user: userId }).populate("recipe");

    const formattedData = favrouits.map((f) => ({
      ...f.recipe._doc, // Recipe details
      _id: f.recipe._id, // Recipe ID for navigation
      favDocId: f._id    // Yeh wali ID delete ke liye use hogi
    }));

    res.status(200).json({
      favorites: formattedData,
      message: "Favorites fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.DeleteFav = async (req, res) => {
  try {
    const { id } = req.params; // Recipe ID aa rahi hai
    const userId = req.user.id;


    const deleted = await FavoriteModel.findOneAndDelete({ 
      user: userId, 
      recipe: id 
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
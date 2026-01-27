const RatingModel = require("../models/Rating.model");

exports.addRating = async (req, res) => {
  try {
    const { recipeId, rating, review } = req.body;
    const existing = await RatingModel.findOne({
      recipe: recipeId,
      user: req.user._id,
    });
    if (existing) {
      existing.rating = rating;
      existing.review = review;
      await existing.save();
      return res.status(202).json({ message: "Rating updated", existing });
    }
    //Add new rating
    const newRating = await RatingModel.create({
      recipe: recipeId,
      user: req.user._id,
      rating,
      review,
    });
    res.status(200).json({ message: "Rating Added", newRating });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getReting = async (req, res) => {
  try {
    const rating = await RatingModel.find({
      recipe: req.params.recipeId,
    }).populate("user", "username Email");
    res.status(200).json({
      count: rating.length,
      rating,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Server",
    });
  }
};

const CommentModel = require("../models/Comment.model");
const mongoose = require("mongoose");
exports.addComment = async (req, res) => {
  try {
    const { recipeId, text } = req.body;

    if (!recipeId || !text || text.trim().length < 3) {
      return res.status(400).json({
        message: "Recipe ID and comment (min 3 chars) required",
      });
    }

    const comment = await CommentModel.create({
      recipe: recipeId,
      user: req.user._id,
      text: text.trim(),
    });

    const populatedComment = await CommentModel.findById(comment._id).populate(
      "user",
      "username",
    );

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

exports.getComment = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const comments = await CommentModel.find({
      recipe: new mongoose.Types.ObjectId(recipeId),
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json({ comments });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (req.user.role !== "admin" && !comment.user.equals(req.user._id)) {
      return res.status(403).json({
        message: "Unauthorized - only author or admin can delete",
      });
    }

    await CommentModel.findByIdAndDelete(req.params.id);
    res.json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

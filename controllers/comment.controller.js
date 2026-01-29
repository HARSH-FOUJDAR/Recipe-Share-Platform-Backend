const CommentModel = require("../models/Comment.model");
exports.addComment = async (req, res) => {
  try {
    const { recipeId, text } = req.body;

    //  Comment create karo
    const comment = await CommentModel.create({
      recipe: recipeId,
      user: req.user._id,
      text,
    });

    // Populate user data
    const populatedComment = await CommentModel.findById(comment._id).populate(
      "user",
      "username",
    );

    // Send response
    res.json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comment not created",
    });
  }
};
exports.getComment = async (req, res) => {
  try {
    const recipeId = req.params.recipeId; // <-- fix this
    const comments = await CommentModel.find({ recipe: recipeId }).populate(
      "user",
      "username",
    ); // populate username

    res.json({ comments }); // send as 'comments' array
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        message: "User not Found",
      });
    }
    if (req.user.role !== "admin" && !comment.user.equals(req.user._id)) {
      return res.status(403).json({
        message: "Not authoriged",
      });
    }
    await comment.deleteOne();
    res.status(200).json({
      message: "Deleted Successfuly",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

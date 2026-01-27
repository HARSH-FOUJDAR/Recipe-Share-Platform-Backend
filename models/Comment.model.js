const mongoose = require("mongoose");

const CommentScema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
});


module.exports = mongoose.model("comment", CommentScema)
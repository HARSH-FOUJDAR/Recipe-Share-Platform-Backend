const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Recipe"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
     ref:"User"
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review:{type: String},
  },
  { timestamps: true },
);

module.exports = mongoose.model("Rating", ratingSchema);

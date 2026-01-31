const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    ingredients: { type: [String], required: true },

    instructions: { type: String, required: true },

    steps: { type: [String], required: true },

    cookTime: { type: Number, required: true },

    servings: { type: Number, required: true },

    cuisine: { type: String },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required:true,
      enum:["BreakFast", "Lunch", "Dinner", "Desert", "Quick Snaks"],
      default:"BreakFast"
    },

    photos: [{ type: String }],

    videoTutorial: { type: String },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    share: { type: Number, default: 0 },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Recipe", RecipeSchema);

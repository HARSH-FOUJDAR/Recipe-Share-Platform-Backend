const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
  {
    // kis user ka meal plan hai
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // kis date ka meal plan hai
    date: {
      type: Date,
      required: true,
    },

    // meals of the day
    meals: {
      breakfast: {
        type: String,
        required: true,
      },
      lunch: {
        type: String,
        required: true,
      },
      dinner: {
        type: String,
        required: true,
      },
    },

    // extra notes (optional)
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// same user same date duplicate na kar sake
mealPlanSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("MealPlan", mealPlanSchema);

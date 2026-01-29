const MealPlanSchema = require("../models/MealPlan.model");

exports.createMealPlan = async (req, res) => {
  try {
    const { date, meals, notes } = req.body;
    if (!date || !meals || !meals.breakfast || !meals.lunch || !meals.dinner) {
      return res.status(400).json({ message: "Dates and all meals required" });
    }
    const existingPlan = await MealPlanSchema.findOne({
      user: req.user._id,
      date: new Date(date),
    });
    if (existingPlan) {
      return res
        .status(400)
        .json({ message: "Meal plan already exists for this date" });
    }
    const mealPlan = await MealPlanSchema.create({
      user: req.user._id,
      date,
      meals,
      notes,
    });
    res
      .status(201)
      .json({ message: "Meal plan created successfully", mealPlan });
  } catch (error) {
    res.status(400).json({ message: "Server error" });
  }
};

exports.getMyMealplane = async (req, res) => {
  try {
    const mealPlans = await MealPlanSchema.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json({ count: mealPlans.length, mealPlans });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { meals, notes, date } = req.body;

    const mealPlan = await MealPlanSchema.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { meals, notes, date },
      { new: true },
    );

    if (!mealPlan) return res.status(404).json({ message: "Plan not found" });

    res.status(200).json({ message: "Meal plan updated", mealPlan });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletMealplan = async (req, res) => {
  try {
    const { id } = req.params;
    const mealPlan = await MealPlanSchema.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!mealPlan) return res.status(404).json({ message: "Plan not found" });

    res.status(200).json({ message: "Meal plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

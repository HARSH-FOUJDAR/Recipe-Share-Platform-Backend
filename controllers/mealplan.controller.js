const MealPlanSchema = require("../models/MealPlan.model");

exports.  createMealPlan = async (req, res) => {
  try {
    const { date, meals, notes } = req.body;
    if (!date || !meals || !meals.breakfast ||! meals.lunch || !meals.dinner) {
      return res.status(400).json({
        message: "Dates and all meals required",
      });
    }
    const existingpaln = await MealPlanSchema.findOne({
      user: req.user._id,
      date: new Date(date),
    });
    if (existingpaln) {
      return res.status(400).json({
        message: "Meal plan already exists for this date",
      });
    }
    const mealPlan = await MealPlanSchema.create({
      user: req.user._id,
      date,
      meals,
      notes,
    });
    res.status(201).json({
      message: "Meal plan created successfully",
      mealPlan,
    });
  } catch (error) {
    res.status(400).json({
      message: "Server eoor ",
    });
  }
};

exports.getMyMealplane = async (req, res) => {
  try {
    const mealPlans = await MealPlanSchema.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json({
      count: mealPlans.length,
      mealPlans,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { meals, notes } = req.body;

    //  find meal plan
    const mealPlan = await MealPlanSchema.findById(planId);

    if (!mealPlan) {
      return res.status(404).json({
        message: "Meal plan not found",
      });
    }

    //  ownership check
    if (mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this plan",
      });
    }

    //  update fields
    if (meals) mealPlan.meals = meals;
    if (notes) mealPlan.notes = notes;

    await mealPlan.save();

    res.status(200).json({
      message: "Meal plan updated",
      mealPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletMealplan = async (req, res) => {
  try {
    const { planId } = req.params;

    const mealPlan = await MealPlanSchema.findById(planId);

    if (!mealPlan) {
      return res.status(404).json({
        message: "Meal plan not found",
      });
    }

    // ownership check
    if (mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this plan",
      });
    }

    await mealPlan.deleteOne();

    res.status(200).json({
      message: "Meal plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware')
const MealPlanControllers = require('../controllers/mealplan.controller');

router.post("/createmealplan",authenticate,MealPlanControllers.createMealPlan);
router.get("/mealplan",authenticate,MealPlanControllers.getMyMealplane )
router.put("/mealplan/:id",authenticate, MealPlanControllers.updateMealPlan);
router.delete("/mealplan/:id", authenticate,MealPlanControllers.deletMealplan)
module.exports = router;
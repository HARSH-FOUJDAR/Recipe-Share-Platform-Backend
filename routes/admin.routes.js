const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin.controller");
const authenticate = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.use(authenticate, adminMiddleware);

// Users management
// Users management
router.get("/users", adminControllers.getAllUsers);
router.put("/block/:id", adminControllers.blockUser);
router.put("/unblock/:id", adminControllers.unblockUser);
router.put("/role/:id", adminControllers.updateUserRole);

// Recipes management
router.get("/recipes", adminControllers.getAllRecipes);
router.delete("/recipe/:id", adminControllers.deleteRecipe);

module.exports = router;
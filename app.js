const express = require("express");
const path = require("path");
const DtabseConnection = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Load Environment Variables
dotenv.config();

// Import Routers
const AuthRouter = require("./routes/auth.routes");
const RecipeRouter = require("./routes/recipe.routes");
const commentRouter = require("./routes/comment.routes");
const MealRouter = require("./routes/mealplan.routes");
const ratingRouter = require("./routes/rating.routes");
const adminRoutes = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const followRouter = require("./routes/follow.routes");

const app = express();

// Database Connection
DtabseConnection();

// Middlewares
app.use(
  cors({
    origin: true, // Production mein ise aapne frontend URL se replace karna chahiye
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes setup
app.use("/auth", AuthRouter);
app.use("/recipes", RecipeRouter);
app.use("/comments", commentRouter);
app.use("/meals", MealRouter);
app.use("/ratings", ratingRouter);
app.use("/admin", adminRoutes);
app.use("/users", userRouter);
app.use("/follows", followRouter);

// Basic Route for testing
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!", status: "online" });
});

// Port Handling
const PORT = process.env.PORT || 3000;

// Local development ke liye app.listen kaam karega
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Vercel ke liye sabse important line:
module.exports = app;
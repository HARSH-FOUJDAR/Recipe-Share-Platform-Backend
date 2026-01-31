const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const Databse = require("./config/db");
dotenv.config();

const AuthRouter = require("./routes/auth.routes");
const RecipeRouter = require("./routes/recipe.routes");
const commentRouter = require("./routes/comment.routes");
const MealRouter = require("./routes/mealplan.routes");
const ratingRouter = require("./routes/rating.routes");
const adminRoutes = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const followRouter = require("./routes/follow.routes");
const favrouits = require("./routes/Favrouits.routes")
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static("public/uploads"));
app.use("/auth", AuthRouter);
app.use("/recipes", RecipeRouter);
app.use("/comments", commentRouter);
app.use("/meals", MealRouter);
app.use("/ratings", ratingRouter);
app.use("/admin", adminRoutes);
app.use("/users", userRouter);
app.use("/follows", followRouter);
app.use("/fav", favrouits)

app.get("/", (req, res) => {
  res.json("Server Is Running ");
});

Databse();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

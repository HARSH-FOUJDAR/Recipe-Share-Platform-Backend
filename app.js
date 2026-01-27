const express = require("express");
const path = require("path");
const DtabseConnection = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const AuthRouter = require("./routes/auth.routes");
const RecipeRouter = require("./routes/recipe.routes");
const commentRouter = require("./routes/comment.routes");
const MealRouter = require("./routes/mealplan.routes");
const ratingRouter = require("./routes/rating.routes");
const adminRoutes = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const followRouter = require("./routes/follow.routes");

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3000;

app.use("/auth", AuthRouter);
app.use("/recipes", RecipeRouter);
app.use("/comments", commentRouter);
app.use("/meals", MealRouter);
app.use("/ratings", ratingRouter);
app.use("/admin", adminRoutes);

app.use("/users", userRouter);
app.use("/follows", followRouter);

DtabseConnection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

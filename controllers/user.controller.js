const UserModel = require("../models/User.model");

exports.Admin = async (req, res) => {
  const userId = req.params;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  user.role = "admin";
  await user.save();

  res.json({ message: `${user.username} is now admin`, user });
};

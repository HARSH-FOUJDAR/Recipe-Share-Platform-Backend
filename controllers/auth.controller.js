const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const sendEmail = require("../utils/sendEmail");
exports.Registerpage = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.Loginpage = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ FIXED ADMIN
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateToken({
        role: "admin",
        isAdmin: true,
      });

      return res.json({
        message: "Admin Login Successfully",
        user: {
          username: "Admin",
          email,
          role: "admin",
        },
        token,
      });
    }

    // 🔹 Normal user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "If email exits, reset link sent",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(email, resetLink);
    return res.json({
      message: "If email exists, reset link has been sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erro" });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "password must be at least 6 cherecter",
      });
    }
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invelid or Expired reset link",
      });
    }
    //Hash new password

    user.password = await bcrypt.hash(newPassword, 10);

    //clear token

    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ message: " Server error" });
  }
};

exports.getMe = (req, res) => {
  res.json({
    message: "User is authenticated",
    user: req.user,
  });
};

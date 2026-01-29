const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    
    // 1. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Fetch User (Exclude sensitive fields like password)
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User no longer exists." });
    }

    // 3. Status Check (Blocked or Deactivated)
    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account is blocked." });
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
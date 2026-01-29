const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.isAdmin === true) {
      const adminUser = await UserModel.findById(decoded.id);
      if (!adminUser) {
        return res.status(404).json({ message: "Admin not found" });
      }
      req.user = adminUser;
      return next();
    }

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;

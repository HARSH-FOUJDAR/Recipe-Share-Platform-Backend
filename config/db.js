const mongoose = require("mongoose");

const DtabseConnection = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = DtabseConnection;

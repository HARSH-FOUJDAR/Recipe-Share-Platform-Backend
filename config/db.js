const mongoose = require("mongoose");

let isConnected = false; 

const Databse = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MongoDB_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    isConnected = db.connections[0].readyState;
    console.log("Database is connected");
  } catch (err) {
    console.log("Database connection error:", err.message);
  
  }
};

module.exports = Databse;
const mongoose = require("mongoose");

const Databse = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("Database is connected");
  } catch (err) {
    console.log(err, "Dtabase in not connected");
  }
};

module.exports = Databse;

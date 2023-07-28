const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://mongodb:27017/Todo_List", {
      autoCreate: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error while connecting to MongoDB", err);
  }
}

connectToMongoDB();

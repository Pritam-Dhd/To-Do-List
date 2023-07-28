const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  to_do: String,
});

module.exports = mongoose.model("Todo", Schema);

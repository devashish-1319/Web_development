const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  identifier: { type: String, unique: true }, // email or phone
  type: { type: String, enum: ["email", "mobile"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

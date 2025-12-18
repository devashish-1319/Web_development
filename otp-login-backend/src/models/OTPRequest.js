const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  identifier: String,
  otpHash: String,
  status: { type: String, enum: ["PENDING", "VERIFIED", "EXPIRED"] },
  expiresAt: Date,
  attempts: { type: Number, default: 0 },
  resendCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("OTPRequest", otpSchema);

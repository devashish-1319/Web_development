const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  traceId: String,
  api: String,
  step: String,
  status: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditSchema);

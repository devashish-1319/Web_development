const AuditLog = require("../models/AuditLog");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res, next) => {
  req.traceId = uuidv4();

  try {
    await AuditLog.create({
      traceId: req.traceId,
      api: req.originalUrl,
      step: "REQUEST_RECEIVED",
      status: "INFO",
      message: "API called"
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }

  next();
};

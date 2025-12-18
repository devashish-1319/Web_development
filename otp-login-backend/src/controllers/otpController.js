const User = require("../models/User");
const OTPRequest = require("../models/OTPRequest");
const { generateOTP, hashOTP, verifyOTP } = require("../utils/otp");

exports.sendOTP = async (req, res) => {
  const { identifier } = req.body;
  if (!identifier) return res.status(400).json({ message: "Identifier required" });

  let user = await User.findOne({ identifier });
  if (!user) {
    user = await User.create({
      identifier,
      type: identifier.includes("@") ? "email" : "mobile"
    });
  }

  const otp = generateOTP();
  const otpHash = await hashOTP(otp);

  await OTPRequest.create({
    identifier,
    otpHash,
    status: "PENDING",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  console.log("OTP (testing):", otp);

  res.json({ message: "OTP sent successfully" });
};

exports.verifyOTP = async (req, res) => {
  const { identifier, otp } = req.body;

  const record = await OTPRequest.findOne({ identifier, status: "PENDING" })
    .sort({ createdAt: -1 });

  if (!record) return res.status(400).json({ message: "No OTP found" });
  if (record.expiresAt < new Date())
    return res.status(400).json({ message: "OTP expired" });

  if (record.attempts >= 3)
    return res.status(403).json({ message: "Too many attempts" });

  const valid = await verifyOTP(otp, record.otpHash);
  if (!valid) {
    record.attempts++;
    await record.save();
    return res.status(400).json({ message: "Invalid OTP" });
  }

  record.status = "VERIFIED";
  await record.save();

  res.json({ message: "Login successful" });
};

exports.resendOTP = async (req, res) => {
  const { identifier } = req.body;

  const last = await OTPRequest.findOne({ identifier }).sort({ createdAt: -1 });

  if (last && last.resendCount >= 3)
    return res.status(429).json({ message: "Resend limit exceeded" });

  if (last) {
    last.status = "EXPIRED";
    await last.save();
  }

  const otp = generateOTP();
  const otpHash = await hashOTP(otp);

  await OTPRequest.create({
    identifier,
    otpHash,
    resendCount: (last?.resendCount || 0) + 1,
    status: "PENDING",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  console.log("Resent OTP:", otp);

  res.json({ message: "OTP resent" });
};

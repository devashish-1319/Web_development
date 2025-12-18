const bcrypt = require("bcrypt");

exports.generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.hashOTP = async (otp) => bcrypt.hash(otp, 10);

exports.verifyOTP = async (otp, hash) => bcrypt.compare(otp, hash);

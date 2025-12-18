const router = require("express").Router();
const controller = require("../controllers/otpController");

router.post("/send", controller.sendOTP);
router.post("/verify", controller.verifyOTP);
router.post("/resend", controller.resendOTP);

module.exports = router;

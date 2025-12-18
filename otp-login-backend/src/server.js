require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

const app = express();

connectDB();

app.use(express.json());
app.use(logger);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/otp", require("./routes/otpRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});

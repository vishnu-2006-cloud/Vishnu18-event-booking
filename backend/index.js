// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./common/utils/db");
const EventRouter = require("./routes/events.route");
const BookingRouter = require("./routes/booking.route");
const UserRouter = require("./routes/user.route");

const { API_VERISON } = require("./common/config/constants");

const app = express();
const PORT = process.env.PORT || process.env.SERVICE_PORT || 3001;

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", app: "Vishnu Event Booking" });
});

app.use(`${API_VERISON}`, UserRouter);

// Authentication/authorization can be enabled per route as the project grows.
// The current UI sends JWTs through the shared Axios client.
app.use(`${API_VERISON}`, EventRouter);
app.use(`${API_VERISON}`, BookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

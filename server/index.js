const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const serviceRoutes = require("./routes/services");
const bookingRoutes = require("./routes/bookings");
const userRoutes = require("./routes/users");
const { errorMiddleware } = require("./utils/appError");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/revup-garage";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

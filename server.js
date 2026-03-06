require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const adminRoutes = require("./routes/adminRoutes");
const clientRoutes = require("./routes/clientRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/clients", clientRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("ISO Consultancy API Running");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("Mongo URI:", process.env.MONGO_URI);
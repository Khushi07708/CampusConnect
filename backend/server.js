const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const bookRoutes = require("./routes/bookRoutes");
const foodRoutes = require("./routes/foodRoutes");
const roomRoutes = require("./routes/roomRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/rooms", roomRoutes);


app.get("/", (req, res) => {
  res.send("CampusConnect Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
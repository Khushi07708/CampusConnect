const Food = require("../models/Food");

// Add Food Service
exports.addFood = async (req, res) => {
  try {
    const {
      serviceName,
      foodType,
      location,
      price,
      contact,
      description,
    } = req.body;

    const food = new Food({
      serviceName,
      foodType,
      location,
      price,
      contact,
      description,
      image: req.file ? req.file.filename : "",
    });

    await food.save();

    res.status(201).json({
      message: "Food service added successfully",
      food,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Food Services
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json(foods);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
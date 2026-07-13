const Room = require("../models/Room");

// Add Room
exports.addRoom = async (req, res) => {
  try {
    const {
      location,
      rent,
      roomType,
      furnished,
      contact,
      description,
    } = req.body;

    const room = new Room({
      location,
      rent,
      roomType,
      furnished,
      contact,
      description,
      image: req.file ? req.file.filename : "",
    });

    await room.save();

    res.status(201).json({
      message: "Room added successfully",
      room,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    res.status(200).json(rooms);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
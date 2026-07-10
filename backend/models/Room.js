const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    furnished: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
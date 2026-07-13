const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addRoom,
  getRooms,
} = require("../controllers/roomController");

router.post("/", upload.single("image"), addRoom);

router.get("/", getRooms);

module.exports = router;
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createNote,
  getNotes,
} = require("../controllers/noteController");

router.post("/", upload.single("file"), createNote);

router.get("/", getNotes);

module.exports = router;


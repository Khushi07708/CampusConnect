const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addBook,
  getBooks,
} = require("../controllers/bookController");

router.post("/", upload.single("image"), addBook);

router.get("/", getBooks);

module.exports = router;
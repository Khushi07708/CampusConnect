const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addFood,
  getFoods,
} = require("../controllers/foodController");

router.post("/", upload.single("image"), addFood);

router.get("/", getFoods);

module.exports = router;
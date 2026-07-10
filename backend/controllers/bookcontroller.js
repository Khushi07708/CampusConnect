const Book = require("../models/Book");

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, condition, seller, contact } = req.body;

    const book = new Book({
      title,
      author,
      price,
      condition,
      seller,
      contact,
      image: req.file ? req.file.filename : "",
    });

    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      book,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json(books);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const Note = require("../models/Note");

// Create Note
exports.createNote = async (req, res) => {
  try {
    const { title, subject, description, uploadedBy } = req.body;

    const note = new Note({
      title,
      subject,
      description,
      uploadedBy,
      file: req.file ? req.file.filename : "",
    });

    await note.save();

    res.status(201).json({
      message: "Note uploaded successfully",
      note,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const express = require("express");
const multer = require("multer");
const Book = require("./../models/book");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new Book({
      title,
      author,
      pdfPath: req.file.path,
    });
    await newBook.save();
    res.status(201).json({ message: "Kitob yuklandi", book: newBook });
  } catch (err) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

router.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.get("/download/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Kitob topilmadi" });
  res.download(path.resolve(book.pdfPath));
});

module.exports = router;

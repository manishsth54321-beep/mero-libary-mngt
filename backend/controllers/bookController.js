import Book from "../models/Book.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __dirname equivalent in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @desc    Get all books with pagination, search, and filters
// @route   GET /api/books
// @access  Public
export const getAllBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query object
    let query = {};

    // Search functionality
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { author: { $regex: req.query.search, $options: "i" } },
        { category: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by author
    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: "i" };
    }

    // Filter by year
    if (req.query.year) {
      query.publishedYear = parseInt(req.query.year);
    }

    // Get total count for pagination
    const total = await Book.countDocuments(query);

    // Get books with pagination
    const books = await Book.find(query)
      .populate("addedBy", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "addedBy",
      "username email",
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private
export const createBook = async (req, res, next) => {
  try {
    const { title, author, category, description, isbn, publishedYear } =
      req.body;

    // Handle file upload
    let coverImage = "default-book-cover.jpg";
    if (req.file) {
      coverImage = req.file.filename;
    }

    const book = await Book.create({
      title,
      author,
      category,
      description,
      isbn,
      publishedYear,
      coverImage,
      addedBy: req.user.id,
    });

    const populatedBook = await Book.findById(book._id).populate(
      "addedBy",
      "username email",
    );

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: populatedBook,
    });
  } catch (error) {
    // Delete uploaded file if book creation fails
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    next(error);
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
export const updateBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user owns the book or is admin
    if (book.addedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this book",
      });
    }

    // Handle new file upload
    if (req.file) {
      // Delete old image if it's not the default
      if (book.coverImage && book.coverImage !== "default-book-cover.jpg") {
        const oldImagePath = path.join(
          __dirname,
          "../uploads",
          book.coverImage,
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      req.body.coverImage = req.file.filename;
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("addedBy", "username email");

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    next(error);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user owns the book or is admin
    if (book.addedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this book",
      });
    }

    // Delete book cover image if it's not the default
    if (book.coverImage && book.coverImage !== "default-book-cover.jpg") {
      const imagePath = path.join(__dirname, "../uploads", book.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get books by current user
// @route   GET /api/books/mybooks
// @access  Private
export const getMyBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ addedBy: req.user.id })
      .populate("addedBy", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    next(error);
  }
};

import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getMyBooks,
} from "../controllers/bookController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { bookValidation, validate } from "../utils/validators.js";

const router = express.Router();

// @route   GET /api/books
// @route   POST /api/books
router
  .route("/")
  .get(getAllBooks)
  .post(protect, upload.single("coverImage"), bookValidation, validate, createBook);

// @route   GET /api/books/mybooks
router.get("/mybooks", protect, getMyBooks);

// @route   GET /api/books/:id
// @route   PUT /api/books/:id
// @route   DELETE /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(protect, upload.single("coverImage"), bookValidation, validate, updateBook)
  .delete(protect, deleteBook);

export default router;
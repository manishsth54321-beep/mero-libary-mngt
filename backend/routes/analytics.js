import express from "express";
import {
  getSummary,
  getBooksByCategory,
  getBooksByMonth,
  getBooksByAuthor,
  getUserStats,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All analytics routes are protected
router.use(protect);

// @route   GET /api/analytics/summary
router.get("/summary", getSummary);

// @route   GET /api/analytics/books-by-category
router.get("/books-by-category", getBooksByCategory);

// @route   GET /api/analytics/books-by-month
router.get("/books-by-month", getBooksByMonth);

// @route   GET /api/analytics/books-by-author
router.get("/books-by-author", getBooksByAuthor);

// @route   GET /api/analytics/user-stats
router.get("/user-stats", getUserStats);

export default router;

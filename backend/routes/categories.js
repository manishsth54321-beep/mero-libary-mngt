import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/auth.js";
import { categoryValidation, validate } from "../utils/validators.js";

const router = express.Router();

// @route   GET /api/categories
// @route   POST /api/categories
router
  .route("/")
  .get(getAllCategories)
  .post(protect, categoryValidation, validate, createCategory);

// @route   GET /api/categories/:id
// @route   PUT /api/categories/:id
// @route   DELETE /api/categories/:id
router
  .route("/:id")
  .get(getCategoryById)
  .put(protect, categoryValidation, validate, updateCategory)
  .delete(protect, deleteCategory);

export default router;

import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/authController.js";
import { protect, admin } from "../middleware/auth.js";
import { registerValidation, loginValidation, validate } from "../utils/validators.js";

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerValidation, validate, register);

// @route   POST /api/auth/login
router.post("/login", loginValidation, validate, login);

// @route   GET /api/auth/profile
// @route   PUT /api/auth/profile
router
  .route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile);

// @route   GET /api/auth/users
router.get("/users", protect, admin, getAllUsers);

// @route   DELETE /api/auth/users/:id
router.delete("/users/:id", protect, admin, deleteUser);

export default router;
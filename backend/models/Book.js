import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a book title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please add an author name"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "No description available",
    },
    coverImage: {
      type: String,
      default: "default-book-cover.jpg",
    },
    isbn: {
      type: String,
      trim: true,
      sparse: true, // Allows multiple null values
    },
    publishedYear: {
      type: Number,
      min: [1000, "Please add a valid year"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create index for search functionality
bookSchema.index({ title: "text", author: "text", category: "text" });

const Book = mongoose.model("Book", bookSchema);

export default Book;

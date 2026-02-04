import Book from "../models/Book.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

// @desc    Get dashboard summary
// @route   GET /api/analytics/summary
// @access  Private
export const getSummary = async (req, res, next) => {
  try {
    // Get total counts
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalCategories = await Category.countDocuments();

    // Get unique categories from books
    const uniqueCategories = await Book.distinct("category");

    // Get recent books (last 5)
    const recentBooks = await Book.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("addedBy", "username");

    res.status(200).json({
      success: true,
      summary: {
        totalBooks,
        totalUsers,
        totalCategories: uniqueCategories.length,
        recentBooks,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get books by category
// @route   GET /api/analytics/books-by-category
// @access  Private
export const getBooksByCategory = async (req, res, next) => {
  try {
    const booksByCategory = await Book.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: booksByCategory.length,
      data: booksByCategory,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get books by month
// @route   GET /api/analytics/books-by-month
// @access  Private
export const getBooksByMonth = async (req, res, next) => {
  try {
    const booksByMonth = await Book.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $limit: 12, // Last 12 months
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
        },
      },
    ]);

    // Convert month numbers to month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedData = booksByMonth.map((item) => ({
      period: `${monthNames[item.month - 1]} ${item.year}`,
      year: item.year,
      month: item.month,
      count: item.count,
    }));

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData.reverse(), // Oldest to newest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get books by author
// @route   GET /api/analytics/books-by-author
// @access  Private
export const getBooksByAuthor = async (req, res, next) => {
  try {
    const booksByAuthor = await Book.aggregate([
      {
        $group: {
          _id: "$author",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10, // Top 10 authors
      },
      {
        $project: {
          _id: 0,
          author: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: booksByAuthor.length,
      data: booksByAuthor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user statistics
// @route   GET /api/analytics/user-stats
// @access  Private
export const getUserStats = async (req, res, next) => {
  try {
    const userStats = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $limit: 6, // Last 6 months
      },
    ]);

    res.status(200).json({
      success: true,
      count: userStats.length,
      data: userStats,
    });
  } catch (error) {
    next(error);
  }
};

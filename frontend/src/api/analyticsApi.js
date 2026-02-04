import api from "./axios";

export const getSummary = () => api.get("/analytics/summary");

export const getBooksByCategory = () => api.get("/analytics/books-by-category");

export const getBooksByMonth = () => api.get("/analytics/books-by-month");

export const getBooksByAuthor = () => api.get("/analytics/books-by-author");

export const getUserStats = () => api.get("/analytics/user-stats");
import api from "./axios";

// GET /api/books  — supports ?page, ?limit, ?search, ?category, ?author, ?year
export const getAllBooks = (params = {}) => api.get("/books", { params });

// GET /api/books/:id
export const getBookById = (id) => api.get(`/books/${id}`);

// POST /api/books  — multipart (coverImage)
export const createBook = (formData) =>
  api.post("/books", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// PUT /api/books/:id — multipart
export const updateBook = (id, formData) =>
  api.put(`/books/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE /api/books/:id
export const deleteBook = (id) => api.delete(`/books/${id}`);

// GET /api/books/mybooks
export const getMyBooks = () => api.get("/books/mybooks");

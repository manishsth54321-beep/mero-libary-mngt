import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../api/bookApi";
import { getAllCategories } from "../api/categoryApi";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/common/SearchBar";
import Select from "../components/common/Select";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import Button from "../components/common/Button";

const IMG_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export default function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (category) params.category = category;
      if (year) params.year = year;
      const { data } = await getAllBooks(params);
      setBooks(data.books);
      setTotalPages(data.pages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  }, [search, category, year, page]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  useEffect(() => {
    getAllCategories().then(({ data }) => setCategories(data.categories)).catch(() => {});
  }, []);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, category, year]);

  const yearOptions = Array.from({ length: new Date().getFullYear() - 999 }, (_, i) => {
    const y = new Date().getFullYear() - i;
    return { value: y, label: String(y) };
  }).slice(0, 30);

  const catOptions = categories.map((c) => ({ value: c.name, label: c.name }));

  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">
          <span className="text-amber-400" style={{ fontFamily: "Georgia, serif" }}>Library</span> Collection
        </h1>
        <p className="text-slate-500 text-sm mt-1">Browse and discover books in our catalog</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by title, author or category…" />
        </div>
        <Select options={catOptions} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-44" />
        <Select options={yearOptions} value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className="w-36" />
        {(search || category || year) && (
          <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setCategory(""); setYear(""); }}>Clear</Button>
        )}
        {user && (
          <Link to="/books/new" className="ml-auto">
            <Button variant="primary" size="sm">+ Add Book</Button>
          </Link>
        )}
      </div>

      <ErrorMessage message={error} onClose={() => setError("")} />

      {/* Grid */}
      {loading ? (
        <Loading />
      ) : books.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-sm">No books found matching your criteria.</p>
          {(search || category || year) && (
            <Button variant="ghost" size="sm" className="mt-3" onClick={() => { setSearch(""); setCategory(""); setYear(""); }}>Clear filters</Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all">
              {/* Cover */}
              <div className="h-44 bg-slate-800 overflow-hidden">
                <img
                  src={`${IMG_BASE}/uploads/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-100 truncate group-hover:text-amber-400 transition-colors">{book.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{book.author}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-slate-800 text-amber-400 border border-slate-700 px-2 py-0.5 rounded-full">{book.category}</span>
                  {book.publishedYear && <span className="text-xs text-slate-600">{book.publishedYear}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
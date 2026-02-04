import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyBooks, deleteBook } from "../../api/bookApi";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const IMG_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/api$/, "");

export default function BookList() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);

  const fetch = () => {
    setLoading(true);
    getMyBooks()
      .then(({ data }) => setBooks(data.books))
      .catch((err) => setError(err.response?.data?.message || "Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteBook(toDelete._id);
      setBooks((prev) => prev.filter((b) => b._id !== toDelete._id));
      setToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
      setToDelete(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">My Books</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Books you've added to the library
          </p>
        </div>
        <Link to="/books/new">
          <Button variant="primary" size="sm">
            + Add Book
          </Button>
        </Link>
      </div>

      <ErrorMessage message={error} onClose={() => setError("")} />

      {books.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-500 text-sm">
            You haven't added any books yet.
          </p>
          <Link to="/books/new" className="mt-3 inline-block">
            <Button variant="primary" size="sm">
              Add your first book
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                    Book
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                    Author
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 hidden sm:table-cell">
                    Year
                  </th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b border-slate-800 last:border-0 hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded bg-slate-800 overflow-hidden shrink-0">
                          <img
                            src={`${IMG_BASE}/uploads/${book.coverImage}`}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                        <Link
                          to={`/books/${book._id}`}
                          className="text-slate-200 font-medium hover:text-amber-400 transition-colors"
                        >
                          {book.title}
                        </Link>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-400">{book.author}</td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-xs bg-slate-800 text-amber-400 border border-slate-700 px-2 py-0.5 rounded-full">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">
                      {book.publishedYear || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Link to={`/books/edit/${book._id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setToDelete(book)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Book"
        message={`Delete "${toDelete?.title}"? This cannot be undone.`}
      />
    </div>
  );
}

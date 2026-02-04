import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBookById, deleteBook } from "../../api/bookApi";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Button from "../../components/common/Button";

const IMG_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/api$/, "");

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    getBookById(id)
      .then(({ data }) => setBook(data.book))
      .catch((err) => setError(err.response?.data?.message || "Book not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const canEdit =
    user &&
    (isAdmin ||
      book?.addedBy?.id === user.id ||
      book?.addedBy?._id === user.id);

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
      setConfirmDelete(false);
    }
  };

  if (loading) return <Loading />;
  if (error && !book)
    return (
      <div className="text-center py-20">
        <ErrorMessage message={error} />
        <Link
          to="/"
          className="text-amber-400 text-sm mt-4 inline-block hover:underline"
        >
          ← Back to books
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="text-slate-500 hover:text-amber-400 text-sm transition-colors inline-flex items-center gap-1 mb-6"
      >
        <span>←</span> Back to books
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {/* Cover banner */}
        <div className="h-56 bg-slate-800 relative overflow-hidden">
          <img
            src={`${IMG_BASE}/uploads/${book.coverImage}`}
            alt={book.title}
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h1 className="text-2xl font-bold text-slate-100">{book.title}</h1>
            <p className="text-slate-400 text-sm">{book.author}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs bg-slate-800 text-amber-400 border border-slate-700 px-2.5 py-0.5 rounded-full">
              {book.category}
            </span>
            {book.publishedYear && (
              <span className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-0.5 rounded-full">
                Published {book.publishedYear}
              </span>
            )}
            {book.isbn && (
              <span className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-0.5 rounded-full">
                ISBN: {book.isbn}
              </span>
            )}
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            {book.description}
          </p>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-600">
              Added by{" "}
              <span className="text-slate-500">{book.addedBy?.username}</span>
            </p>
            {canEdit && (
              <div className="flex gap-2">
                <Link to={`/books/edit/${book._id}`}>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

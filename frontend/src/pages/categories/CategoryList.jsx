import { useState, useEffect } from "react";
import { getAllCategories, deleteCategory } from "../../api/categoryApi";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CategoryForm from "./CategoryForm";

export default function CategoryList() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const fetch = () => {
    setLoading(true);
    getAllCategories()
      .then(({ data }) => setCategories(data.categories))
      .catch((err) => setError(err.response?.data?.message || "Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async () => {
    try {
      await deleteCategory(toDelete._id);
      setCategories((prev) => prev.filter((c) => c._id !== toDelete._id));
      setToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
      setToDelete(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Categories</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage book categories</p>
        </div>
        {user && (
          <Button variant="primary" size="sm" onClick={() => { setEditTarget(null); setFormOpen(true); }}>+ New Category</Button>
        )}
      </div>

      <ErrorMessage message={error} onClose={() => setError("")} />

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-500 text-sm">No categories yet.</p>
          {user && <Button variant="primary" size="sm" className="mt-3" onClick={() => { setEditTarget(null); setFormOpen(true); }}>Create one</Button>}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-slate-900 border border-slate-800 rounded-lg px-5 py-4 flex items-start justify-between hover:border-slate-700 transition-colors">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">{cat.name}</h3>
                {cat.description && <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>}
              </div>
              {user && (
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => { setEditTarget(cat); setFormOpen(true); }}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => setToDelete(cat)}>Delete</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      <CategoryForm open={formOpen} onClose={() => setFormOpen(false)} editCategory={editTarget} onSave={fetch} />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Delete "${toDelete?.name}"? Books using this category won't be affected immediately.`}
      />
    </div>
  );
}
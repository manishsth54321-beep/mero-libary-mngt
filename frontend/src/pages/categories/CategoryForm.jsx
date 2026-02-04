import { useState, useEffect } from "react";
import { createCategory, updateCategory } from "../../api/categoryApi";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function CategoryForm({ open, onClose, editCategory, onSave }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editCategory) {
      setForm({ name: editCategory.name, description: editCategory.description || "" });
    } else {
      setForm({ name: "", description: "" });
    }
    setError("");
  }, [editCategory, open]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Category name is required");
    setLoading(true);
    try {
      if (editCategory) {
        await updateCategory(editCategory._id, form);
      } else {
        await createCategory(form);
      }
      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={editCategory ? "Edit Category" : "New Category"}>
      <ErrorMessage message={error} onClose={() => setError("")} />
      <form onSubmit={submit} className="flex flex-col gap-4 mt-3">
        <Input label="Name" name="name" value={form.name} onChange={change} placeholder="Fiction" required />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-400">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={change}
            placeholder="Optional description…"
            rows={2}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>{editCategory ? "Save" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
}
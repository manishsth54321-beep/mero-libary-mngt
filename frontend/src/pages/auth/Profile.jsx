import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/authApi";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import SuccessMessage from "../../components/common/SuccessMessage";
import Loading from "../../components/common/Loading";

export default function Profile() {
  const { user, refreshProfile } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setForm((prev) => ({ ...prev, username: user.username, email: user.email }));
  }, [user]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (form.password && form.password !== form.confirmPassword) return setError("Passwords do not match");
    setLoading(true);
    try {
      const payload = { username: form.username, email: form.email };
      if (form.password) payload.password = form.password;
      await updateProfile(payload);
      await refreshProfile();
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-semibold text-slate-100 mb-6">Profile Settings</h1>
      <ErrorMessage message={error} onClose={() => setError("")} />
      <SuccessMessage message={success} />

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-xl font-bold text-white">
            {user.username[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-slate-100 font-medium">{user.username}</p>
            <p className="text-slate-500 text-sm">{user.role === "admin" ? "Administrator" : "Member"}</p>
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input label="Username" name="username" value={form.username} onChange={change} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={change} />
          <hr className="border-slate-700 my-1" />
          <p className="text-xs text-slate-600">Leave password fields empty to keep current password</p>
          <Input label="New Password" name="password" type="password" value={form.password} onChange={change} placeholder="New password (optional)" />
          <Input label="Confirm New Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={change} placeholder="Confirm new password" />
          <Button type="submit" loading={loading} className="mt-2">Save Changes</Button>
        </form>
      </div>
  </div>
  );
}
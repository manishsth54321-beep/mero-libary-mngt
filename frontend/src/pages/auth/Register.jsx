import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password) return setError("All fields are required");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      await register({ username: form.username, email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl font-bold text-amber-400" style={{ fontFamily: "Georgia, serif" }}>𝔉</span>
          <p className="text-slate-500 text-sm mt-1">Library Management System</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-xl">
          <h1 className="text-lg font-semibold text-slate-100 mb-1">Create account</h1>
          <p className="text-slate-500 text-sm mb-5">Join the library today</p>

          <ErrorMessage message={error} onClose={() => setError("")} />

          <form onSubmit={submit} className="flex flex-col gap-4 mt-4">
            <Input label="Username" name="username" type="text" value={form.username} onChange={change} placeholder="johndoe" required />
            <Input label="Email" name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required />
            <Input label="Password" name="password" type="password" value={form.password} onChange={change} placeholder="Min 6 characters" required />
            <Input label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={change} placeholder="Re-enter password" required />
            <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">Register</Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
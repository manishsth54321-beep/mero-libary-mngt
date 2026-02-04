import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("All fields are required");
    setLoading(true);
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <span className="text-4xl font-bold text-amber-400" style={{ fontFamily: "Georgia, serif" }}>𝔉</span>
          <p className="text-slate-500 text-sm mt-1">Library Management System</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-xl">
          <h1 className="text-lg font-semibold text-slate-100 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-5">Sign in to your account</p>

          <ErrorMessage message={error} onClose={() => setError("")} />

          <form onSubmit={submit} className="flex flex-col gap-4 mt-4">
            <Input label="Email" name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required />
            <Input label="Password" name="password" type="password" value={form.password} onChange={change} placeholder="••••••••" required />
            <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">Sign In</Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Don't have an account?{" "}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLink = (to, label) => (
    <Link
      key={to}
      to={to}
      className={`text-sm font-medium transition-colors ${
        location.pathname.startsWith(to) && to !== "/"
          ? "text-amber-400"
          : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-400" style={{ fontFamily: "Georgia, serif" }}>𝔉</span>
          <span className="text-sm font-semibold text-slate-200 tracking-wide">LibraryMS</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLink("/", "Home")}
          {user && navLink("/my-books", "My Books")}
          {user && navLink("/categories", "Categories")}
          {isAdmin && navLink("/dashboard", "Dashboard")}
        </nav>

        {/* Desktop auth section */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                {user.username}
                {isAdmin && <span className="ml-1.5 text-xs bg-amber-600 text-white px-1.5 py-0.5 rounded">admin</span>}
              </Link>
              <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-400 transition-colors">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Login</Link>
              <Link to="/register" className="text-sm bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Register</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-slate-400 hover:text-slate-200">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></> : <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Home</Link>
          {user && <Link to="/my-books" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">My Books</Link>}
          {user && <Link to="/categories" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Categories</Link>}
          {isAdmin && <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Dashboard</Link>}
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">{user.username}</Link>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-sm text-red-400 text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm text-amber-400 font-medium">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
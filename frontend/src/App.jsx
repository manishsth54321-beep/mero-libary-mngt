import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Loading from "./components/common/Loading";

// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import BookDetail from "./pages/books/BookDetail";
import BookForm from "./pages/books/BookForm";
import BookList from "./pages/books/BookList";
import CategoryList from "./pages/categories/CategoryList";
import DashboardHome from "./pages/dashboard/DashboardHome";
import UsersPage from "./pages/dashboard/UsersPage";
import NotFound from "./styles/pages/Notfound";

// ── Guards ────────────────────────────────────
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Loading fullPage />;
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: loc }} replace />
  );
}

function RequireAdmin({ children }) {
  const { user, isAdmin, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Loading fullPage />;
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
  return isAdmin ? children : <Navigate to="/" replace />;
}

function RedirectIfAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading fullPage />;
  return user ? <Navigate to="/" replace /> : children;
}

// ── App ───────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* Public – auth pages (no navbar) */}
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuth>
            <Register />
          </RedirectIfAuth>
        }
      />

      {/* Public – pages wrapped with Navbar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Auth-required */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/my-books"
          element={
            <RequireAuth>
              <BookList />
            </RequireAuth>
          }
        />
        <Route
          path="/books/new"
          element={
            <RequireAuth>
              <BookForm />
            </RequireAuth>
          }
        />
        <Route
          path="/books/edit/:id"
          element={
            <RequireAuth>
              <BookForm />
            </RequireAuth>
          }
        />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/categories" element={<CategoryList />} />

        {/* Admin-only */}
        <Route
          path="/dashboard"
          element={
            <RequireAdmin>
              <DashboardHome />
            </RequireAdmin>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <RequireAdmin>
              <UsersPage />
            </RequireAdmin>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

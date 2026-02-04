import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
// Import your sub-pages here later
// import BookInventory from './pages/BookInventory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* This index route shows by default at /dashboard */}
        <Route
          index
          element={<div className="text-2xl font-bold">Welcome to Stats!</div>}
        />
        <Route
          path="books"
          element={<div className="text-2xl font-bold">Book Inventory</div>}
        />
        <Route
          path="members"
          element={<div className="text-2xl font-bold">Member Management</div>}
        />
      </Route>
    </Routes>
  );
}

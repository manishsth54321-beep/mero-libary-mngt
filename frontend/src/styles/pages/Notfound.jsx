import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="text-7xl font-bold text-slate-800">404</p>
      <h1 className="text-xl font-semibold text-slate-200 mt-2">
        Page not found
      </h1>
      <p className="text-slate-500 text-sm mt-1 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-5 text-sm bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

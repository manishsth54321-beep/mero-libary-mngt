import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/common/Loading";
import Card from "../../components/common/Card";
import { getSummary, getBooksByCategory, getBooksByMonth, getBooksByAuthor } from "../../api/analyticsApi";

const IMG_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

// Mini horizontal bar chart rendered purely in JSX/CSS
function BarChart({ data, keyLabel, keyValue, maxBars = 6 }) {
  if (!data || data.length === 0) return <p className="text-slate-600 text-xs py-4 text-center">No data available</p>;
  const sliced = data.slice(0, maxBars);
  const max = Math.max(...sliced.map((d) => d[keyValue]), 1);
  return (
    <div className="flex flex-col gap-2.5">
      {sliced.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-slate-400 w-24 shrink-0 truncate text-right">{item[keyLabel]}</span>
          <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-700"
              style={{ width: `${(item[keyValue] / max) * 100}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 w-7 text-right">{item[keyValue]}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [byCategory, setByCategory] = useState([]);
  const [byMonth, setByMonth] = useState([]);
  const [byAuthor, setByAuthor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, c, m, a] = await Promise.all([getSummary(), getBooksByCategory(), getBooksByMonth(), getBooksByAuthor()]);
        setSummary(s.data.summary);
        setByCategory(c.data.data);
        setByMonth(m.data.data);
        setByAuthor(a.data.data);
      } catch {
        // silently handled
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loading />;

  const statCards = [
    { label: "Total Books", value: summary?.totalBooks ?? 0, color: "text-amber-400", icon: "📚" },
    { label: "Categories", value: summary?.totalCategories ?? 0, color: "text-emerald-400", icon: "🏷️" },
    { label: "Members", value: summary?.totalUsers ?? 0, color: "text-sky-400", icon: "👥" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{s.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
                <span className="text-2xl">{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card title="Books by Category">
            <BarChart data={byCategory} keyLabel="category" keyValue="count" />
          </Card>
          <Card title="Books by Author">
            <BarChart data={byAuthor} keyLabel="author" keyValue="count" />
          </Card>
        </div>

        {/* Monthly trend */}
        <Card title="Books Added (Last 12 Months)" className="mb-6">
          <BarChart data={byMonth} keyLabel="period" keyValue="count" maxBars={12} />
        </Card>

        {/* Recent books */}
        <Card title="Recent Books">
          {summary?.recentBooks?.length === 0 ? (
            <p className="text-slate-600 text-xs text-center py-4">No books yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-2">#</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-2">Title</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-2 hidden sm:table-cell">Added By</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentBooks.map((b, i) => (
                    <tr key={b._id} className="border-b border-slate-800 last:border-0">
                      <td className="py-2.5 text-slate-600">{i + 1}</td>
                      <td className="py-2.5">
                        <Link to={`/books/${b._id}`} className="text-slate-300 hover:text-amber-400 transition-colors">{b.title}</Link>
                      </td>
                      <td className="py-2.5 text-slate-500 hidden sm:table-cell">{b.addedBy?.username}</td>
                      <td className="py-2.5 text-slate-600 text-xs">{new Date(b.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
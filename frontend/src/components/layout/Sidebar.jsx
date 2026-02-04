import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Overview", icon: "⊞" },
  { to: "/dashboard/users", label: "Users", icon: "⚉" },
];

export default function Sidebar() {
  const loc = useLocation();

  return (
    <aside className="w-48 bg-slate-900 border-r border-slate-800 min-h-[calc(100vh-3.5rem)] flex flex-col pt-4">
      <p className="text-xs font-semibold text-slate-600 tracking-widest uppercase px-4 mb-2">
        Admin
      </p>
      <nav className="flex flex-col gap-0.5 px-2">
        {links.map(({ to, label, icon }) => {
          const active = loc.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${active ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

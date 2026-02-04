import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Define menu items for easy maintenance
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Books Library', path: '/dashboard/books', icon: '📚' },
    { name: 'Member List', path: '/dashboard/members', icon: '👥' },
    { name: 'Issue/Return', path: '/dashboard/transactions', icon: '🔄' },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
          L
        </div>
        <span className="text-xl font-bold text-white tracking-tight">LibManager</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            // This function checks if the link is active and applies styles accordingly
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer / User Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-blue-400 border border-slate-600">
            AD
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-white truncate">Admin User</span>
            <NavLink to="/login" className="text-xs text-red-400 hover:underline">
              Sign out
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
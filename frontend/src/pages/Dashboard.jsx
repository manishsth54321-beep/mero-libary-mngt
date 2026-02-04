import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const stats = [
    { label: "Total Books", value: "1,240", color: "bg-blue-500" },
    { label: "Active Members", value: "450", color: "bg-green-500" },
    { label: "Books Issued", value: "85", color: "bg-purple-500" },
    { label: "Overdue", value: "12", color: "bg-red-500" },
  ];

  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-64 flex-grow min-h-screen bg-gray-100 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">System Overview</h1>
          <p className="text-gray-500">Welcome back, Librarian!</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <p className="text-sm font-medium text-gray-500 uppercase">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stat.value}
              </p>
              <div className={`h-1 w-12 mt-4 ${stat.color} rounded`}></div>
            </div>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Recent Transactions
          </h3>
          <div className="border-t border-gray-100">
            {/* You can map through your transactions here later */}
            <p className="py-4 text-gray-400 text-center italic">
              No recent activity found.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* This "Outlet" is where the specific page content (Books, Stats, etc.) will render */}
      <main className="flex-grow ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
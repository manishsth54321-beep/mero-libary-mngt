import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-8 py-5 shadow-sm bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">LibStack</span>
        </div>

        {/* Center Links (Optional) */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#about" className="hover:text-blue-600 transition">About</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-gray-700 font-semibold hover:text-blue-600 transition px-4 py-2"
          >
            Log in
          </Link>
          <Link 
            to="/register" 
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 shadow-md hover:shadow-blue-200 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
          New: Version 2.0 is here
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 max-w-4xl leading-tight">
          The smarter way to <span className="text-blue-600">manage books.</span>
        </h1>
        
        <p className="text-xl text-gray-500 mb-10 max-w-2xl">
          A comprehensive platform for modern libraries. Streamline cataloging, 
          member tracking, and book circulation with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/register" 
            className="px-10 py-4 bg-gray-900 text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition shadow-xl"
          >
            Start for Free
          </Link>
          <button className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-700 text-lg font-bold rounded-xl hover:bg-gray-50 transition">
            Watch Demo
          </button>
        </div>

        {/* Placeholder for a Dashboard Preview Image */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
          <div className="bg-gray-100 h-64 md:h-96 flex items-center justify-center text-gray-400 italic">
            [Library Dashboard Preview Image]
          </div>
        </div>
      </main>

      <footer className="py-10 border-t border-gray-100 text-center text-gray-400">
        <p>© 2026 LibStack Management System. Built for Colleges.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
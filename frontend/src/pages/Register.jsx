import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join the library management system</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" />
          </div>
          
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-4">
            Register Now
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
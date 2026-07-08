import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Restaurant POS</h1>
        </div>
        <nav className="mt-6 space-y-2 px-6">
          <Link
            to="/"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Orders
          </Link>
          <Link
            to="/menu"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Menu
          </Link>
          <Link
            to="/tables"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Tables
          </Link>
          <Link
            to="/reports"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Reports
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Welcome, {user?.name}</h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

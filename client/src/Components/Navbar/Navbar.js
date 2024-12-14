import React from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ username }) => {
  const Navigate=useNavigate()
  const handleLogout = () => {
    // Add logout logic here
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    Navigate('/')
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-teal-600 shadow-md">
      <div className="text-2xl font-bold text-white">
        Mom Pharmacy Employment Portal
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">👤</span>
          <span className="text-white font-medium">
            {username || 'User'}
          </span>
        </div>
        <button
          className="px-4 py-2 bg-teal-700 text-white font-medium rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
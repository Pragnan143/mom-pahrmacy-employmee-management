import React from 'react';

const Navbar = ({ username }) => {
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-yellow-300 shadow-md">
      <div className="text-2xl font-bold text-teal-600">
        Mom Pharmacy Employment Portal
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">👤</span>
          <span className="text-teal-600 font-medium">
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
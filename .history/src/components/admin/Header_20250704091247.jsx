import React from 'react';

const Header = ({ dropdownOpen, setDropdownOpen, handleLogout }) => (
  <header className="border-b-2 border-black bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-sm">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFCD11' }}>
              <span className="font-medium text-black">A</span>
            </div>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-black rounded shadow z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-black hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default Header;

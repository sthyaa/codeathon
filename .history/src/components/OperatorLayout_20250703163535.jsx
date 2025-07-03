import React, { useState } from 'react';
import OperatorSidebar from '../components/OperatorSidebar';
import { Menu } from 'lucide-react';

const OperatorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <OperatorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Overlay for closing sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1">
        {/* Hamburger menu */}
        <button
          className="m-4 p-2 rounded-md text-black bg-yellow-400 shadow-lg lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="w-7 h-7" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default OperatorLayout;

import React, { useState } from 'react';
import OperatorSidebar from '../components/OperatorSidebar';
import { Menu } from 'lucide-react';

const OperatorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <OperatorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Overlay for closing sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1">
        {/* Hamburger menu always visible at top left */}
        <button
          className="m-4 p-2 rounded-md text-black bg-yellow-400 shadow-lg fixed top-4 left-4 z-40"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="w-7 h-7" />
        </button>
        <div className="pt-4 pl-0">{children}</div>
      </div>
    </div>
  );
};

export default OperatorLayout;

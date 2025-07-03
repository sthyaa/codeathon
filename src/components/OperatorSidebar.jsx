import React from 'react';
import { Home, Calendar, BookOpen, BarChart3, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const OperatorSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/operator' },
    { id: 'tasks', label: 'Tasks', icon: Calendar, path: '/operator?tab=tasks' },
    { id: 'training', label: 'Training', icon: BookOpen, path: '/training' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/operator?tab=analytics' }
  ];
  // Sidebar slides in on mobile, static on large screens
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-black shadow-xl flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-yellow-400">CAT Assistant</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white p-2 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              (item.path === '/training' && location.pathname === '/training') ||
              (item.path === '/operator' && location.pathname === '/operator') ||
              (item.path.startsWith('/operator') && location.pathname === '/operator' && location.search.includes(item.id));
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default OperatorSidebar;

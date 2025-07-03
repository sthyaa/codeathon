import React from 'react';
import { Home, Calendar, BookOpen, BarChart3 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const OperatorSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/operator' },
    { id: 'tasks', label: 'Tasks', icon: Calendar, path: '/operator?tab=tasks' },
    { id: 'training', label: 'Training', icon: BookOpen, path: '/training' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/operator?tab=analytics' }
  ];
  return (
    <aside className="w-64 bg-black min-h-screen shadow-xl flex flex-col z-30">
      <div className="p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-8">CAT Assistant</h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              (item.path === '/training' && location.pathname === '/training') ||
              (item.path === '/operator' && location.pathname === '/operator') ||
              (item.path.startsWith('/operator') && location.pathname === '/operator' && location.search.includes(item.id));
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
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

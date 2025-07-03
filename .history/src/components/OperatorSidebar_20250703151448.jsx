import React from 'react';
import { Home, Calendar, BookOpen, BarChart3, X } from 'lucide-react';

const OperatorSidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => (
  <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-black shadow-xl transition-transform duration-300 ease-in-out z-50`}>
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-yellow-400">CAT Assistant</h2>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="text-gray-400 hover:text-white p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="space-y-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'tasks', label: 'Tasks', icon: Calendar },
          { id: 'training', label: 'Training', icon: BookOpen },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-yellow-400 text-black' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  </div>
);

export default OperatorSidebar;

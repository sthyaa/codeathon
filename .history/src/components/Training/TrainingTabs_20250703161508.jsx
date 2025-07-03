import React from 'react';

const TrainingTabs = ({ activeTab, handleTabChange, tabDefs }) => (
  <nav className="bg-white shadow-sm border-b">
    <div className="px-6">
      <div className="flex space-x-8">
        {tabDefs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-yellow-400 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  </nav>
);

export default TrainingTabs;

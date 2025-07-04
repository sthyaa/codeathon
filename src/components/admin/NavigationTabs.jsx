import React from 'react';

const NavigationTabs = ({ activeTab, setActiveTab }) => (
  <nav className="bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-8">
      {['schedule', 'progress', 'reports'].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors text-white ${activeTab === tab ? 'border-b-[2px]' : ''}`}
          style={{ borderBottomColor: activeTab === tab ? '#FFCD11' : 'transparent' }}
        >
          {tab === 'schedule' ? 'Schedule' : tab === 'progress' ? 'View Progress' : 'Report Summary'}
        </button>
      ))}
    </div>
  </nav>
);

export default NavigationTabs;

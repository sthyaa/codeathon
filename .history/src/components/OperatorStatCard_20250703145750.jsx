import React from 'react';

const OperatorStatCard = ({ icon: Icon, title, value, unit, color = 'text-yellow-400' }) => (
  <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>
          {value} <span className="text-sm font-normal">{unit}</span>
        </p>
      </div>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
  </div>
);

export default OperatorStatCard;

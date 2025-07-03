import React from 'react';
import { ArrowRight } from 'lucide-react';

const LearningPathCard = ({ path }) => {
  const IconComponent = path.icon;
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${path.color} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          path.progress === 100 
            ? 'bg-green-100 text-green-800' 
            : path.progress > 0 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
        }`}>
          {path.progress === 100 ? 'Completed' : path.progress > 0 ? 'In Progress' : 'Not Started'}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-black mb-2">{path.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{path.description}</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{path.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${path.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{path.courses} courses</span>
          <span>{path.duration}</span>
          <span>{path.level}</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
        <span>{path.progress === 100 ? 'Review' : path.progress > 0 ? 'Continue' : 'Start Path'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default LearningPathCard;

import React from 'react';
import { MapPin, Clock, Play, Pause, CheckCircle } from 'lucide-react';

const getStatusColor = (status) => {
  switch(status) {
    case 'completed': return 'bg-green-500';
    case 'in-progress': return 'bg-yellow-400';
    case 'pending': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return 'border-l-red-500';
    case 'medium': return 'border-l-yellow-400';
    case 'low': return 'border-l-green-500';
    default: return 'border-l-gray-400';
  }
};

const OperatorTaskCard = ({ task, setTaskInProgress }) => (
  <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${getPriorityColor(task.priority)} hover:shadow-xl transition-all duration-300`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black mb-2">{task.title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {task.location}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          {task.estimatedTime}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>
    </div>
    {task.status === 'in-progress' && (
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>
    )}
    <div className="flex items-center justify-between">
      <span className={`text-xs px-2 py-1 rounded-full ${
        task.priority === 'high' ? 'bg-red-100 text-red-800' :
        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {task.priority.toUpperCase()} PRIORITY
      </span>
      {task.status === 'pending' && (
        <button 
          onClick={() => setTaskInProgress(task.id)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
        >
          <Play className="w-4 h-4" />
          <span>Start</span>
        </button>
      )}
      {task.status === 'in-progress' && (
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1">
          <Pause className="w-4 h-4" />
          <span>Pause</span>
        </button>
      )}
      {task.status === 'completed' && (
        <CheckCircle className="w-6 h-6 text-green-500" />
      )}
    </div>
  </div>
);

export default OperatorTaskCard;

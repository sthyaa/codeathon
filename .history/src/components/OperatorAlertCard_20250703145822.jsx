import React from 'react';
import { AlertTriangle } from 'lucide-react';

const OperatorAlertCard = ({ alert }) => (
  <div className={`p-4 rounded-lg border-l-4 ${
    alert.type === 'warning' ? 'bg-yellow-50 border-l-yellow-400' :
    alert.type === 'danger' ? 'bg-red-50 border-l-red-500' :
    'bg-blue-50 border-l-blue-400'
  }`}>
    <div className="flex items-start">
      <AlertTriangle className={`w-5 h-5 mt-0.5 mr-3 ${
        alert.type === 'warning' ? 'text-yellow-400' :
        alert.type === 'danger' ? 'text-red-500' :
        'text-blue-400'
      }`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-black">{alert.message}</p>
        <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
      </div>
    </div>
  </div>
);

export default OperatorAlertCard;

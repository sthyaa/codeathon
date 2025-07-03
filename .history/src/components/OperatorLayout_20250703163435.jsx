import React from 'react';
import OperatorSidebar from '../components/OperatorSidebar';

const OperatorLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <OperatorSidebar />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};

export default OperatorLayout;

import React from 'react';
import { FileText } from 'lucide-react';

const ReportsSection = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">Report Summary</h2>
    <div className="rounded-lg border-2 border-black bg-white">
      <div className="px-6 py-4 border-b border-black">
        <h3 className="text-lg font-medium flex items-center"><FileText className="h-5 w-5 mr-2" />Generated Reports</h3>
      </div>
      <div className="p-6 text-center py-12">
        <FileText className="h-12 w-12 mx-auto mb-4 text-[#FFCD11]" />
        <p className="text-lg font-medium">No Report Found</p>
        <p className="text-sm mt-2">Reports will be generated automatically once tasks are completed</p>
      </div>
    </div>
  </div>
);

export default ReportsSection;

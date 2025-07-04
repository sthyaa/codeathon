import React from 'react';
import { BarChart3, GaugeCircle, ListChecks } from 'lucide-react';

const ProgressSection = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">View Progress</h2>
    {[{ title: 'Operator Progress', Icon: BarChart3 }, { title: 'Machine Progress', Icon: GaugeCircle }, { title: 'Task Progress', Icon: ListChecks }].map(({ title, Icon }) => (
      <div key={title} className="rounded-lg border-2 border-black bg-white">
        <div className="px-6 py-4 border-b border-black">
          <h3 className="text-lg font-medium flex items-center"><Icon className="h-5 w-5 mr-2" />{title}</h3>
        </div>
        <div className="p-6 text-center py-12">
          <Icon className="h-12 w-12 mx-auto mb-4 text-[#FFCD11]" />
          <p className="text-lg font-medium">No Data Found</p>
        </div>
      </div>
    ))}
  </div>
);

export default ProgressSection;

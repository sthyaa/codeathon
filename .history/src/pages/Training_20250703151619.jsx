import React from 'react';

const Training = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))] p-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[hsl(var(--border))]/40 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">Operator Training & Learning</h1>
        <p className="text-gray-700 mb-6">Welcome to the learning center! Here you can find resources, guides, and videos to help you operate safely and efficiently.</p>
        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800">
          <li>Machine Operation Basics (video)</li>
          <li>Safety Protocols & Best Practices (PDF)</li>
          <li>Maintenance Checklists (interactive)</li>
          <li>Advanced Controls & Features (video)</li>
          <li>FAQ & Troubleshooting</li>
        </ul>
        <div className="mt-8 text-center text-gray-500 text-sm">
          More content coming soon!
        </div>
      </div>
    </div>
  );
};

export default Training;

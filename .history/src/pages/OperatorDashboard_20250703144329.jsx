import React from "react";

const OperatorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))] p-8">
      <h1 className="text-4xl font-bold mb-4 text-[hsl(var(--caterpillar-yellow))]">Operator Dashboard</h1>
      <p className="text-lg text-[hsl(var(--foreground))] mb-8">Welcome, Operator! Here you can manage your tasks and view important information.</p>
      {/* Add operator-specific dashboard widgets/components here */}
      <div className="w-full max-w-2xl bg-[hsl(var(--card))]/90 rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--foreground))]">
          <li>View assigned tasks</li>
          <li>Submit reports</li>
          <li>Access resources</li>
        </ul>
      </div>
    </div>
  );
};

export default OperatorDashboard;

import React from 'react';
import { BookOpen, Play, CheckCircle } from 'lucide-react';

const TrainingHeader = ({ userProgress }) => (
  <header className="bg-black shadow-lg border-b-4 border-yellow-400">
    <div className="px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">CAT Training Hub</h1>
          <p className="text-gray-400 mt-1">Enhance your skills with world-class training</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{userProgress.completed}</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{userProgress.inProgress}</div>
              <div className="text-xs text-gray-400">In Progress</div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{userProgress.totalCourses}</div>
              <div className="text-xs text-gray-400">Total Courses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default TrainingHeader;

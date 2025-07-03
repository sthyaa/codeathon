import React from 'react';
import { Trophy, Award } from 'lucide-react';

const TrainingProgress = ({ userProgress }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-black">Your Progress</h2>
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-black mb-4">Learning Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{Math.round((userProgress.completed / userProgress.totalCourses) * 100)}%</div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500 mb-2">{userProgress.totalHours}</div>
          <div className="text-sm text-gray-600">Hours Learned</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500 mb-2">{userProgress.certifications}</div>
          <div className="text-sm text-gray-600">Certificates Earned</div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-black mb-4">Recent Achievements</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <div className="font-medium text-black">Safety Excellence Certificate</div>
            <div className="text-sm text-gray-600">Completed advanced safety training</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
          <Award className="w-8 h-8 text-blue-500" />
          <div>
            <div className="font-medium text-black">Maintenance Specialist</div>
            <div className="text-sm text-gray-600">Mastered preventive maintenance procedures</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TrainingProgress;

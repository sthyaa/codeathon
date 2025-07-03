import React from 'react';
import LearningPathCard from './LearningPathCard';

const TrainingPaths = ({ learningPaths }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-black mb-2">Learning Paths</h2>
      <p className="text-gray-600">Structured learning journeys to advance your skills</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {learningPaths.map(path => (
        <LearningPathCard key={path.id} path={path} />
      ))}
    </div>
  </div>
);

export default TrainingPaths;

import React from 'react';
import InstructorCard from './InstructorCard';

const TrainingInstructors = ({ instructors }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-black">Expert Instructors</h2>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium transition-all duration-200">
        Schedule 1-on-1 Session
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instructors.map(instructor => (
        <InstructorCard key={instructor.id} instructor={instructor} />
      ))}
    </div>
  </div>
);

export default TrainingInstructors;

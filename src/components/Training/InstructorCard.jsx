import React from 'react';
import { Star, User } from 'lucide-react';

const InstructorCard = ({ instructor }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <User className="w-8 h-8 text-gray-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black">{instructor.name}</h3>
        <p className="text-gray-600 text-sm">{instructor.specialty}</p>
        <div className="flex items-center space-x-2 mt-1">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{instructor.rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{instructor.experience}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm text-gray-600">
        <span className="font-medium">{instructor.students}</span> students taught
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        instructor.available 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {instructor.available ? 'Available' : 'Busy'}
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Next slot: <span className="font-medium">{instructor.nextSlot}</span>
      </div>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
        Book Session
      </button>
    </div>
  </div>
);

export default InstructorCard;

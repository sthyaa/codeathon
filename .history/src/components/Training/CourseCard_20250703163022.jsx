import React from 'react';
import { Play, Star, Clock, Users, User, CheckCircle } from 'lucide-react';

const CourseCard = ({ course, getTypeIcon, getTypeColor, getDifficultyColor, handleSelectCourse, videoProgress }) => {
  const TypeIcon = getTypeIcon(course.type);
  const progress = videoProgress && videoProgress[course.id]?.percent;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          {course.type === 'video' && course.videoUrl ? (
            <button onClick={() => handleSelectCourse(course)} className="w-full h-full flex items-center justify-center">
              <Play className="w-16 h-16 text-yellow-500" />
            </button>
          ) : (
            <TypeIcon className="w-16 h-16 text-gray-600" />
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getTypeColor(course.type)}`}>
            {course.type.toUpperCase()}
          </span>
        </div>
        {course.completed && (
          <div className="absolute top-4 left-4">
            <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
          </div>
        )}
        {/* Progress percent bar or text */}
        {typeof progress === 'number' && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-700 mt-1 text-right">{progress}%</div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-black line-clamp-2">{course.title}</h3>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolled}</span>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>
          <button 
            onClick={() => handleSelectCourse(course)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
              course.completed 
                ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                : 'bg-yellow-400 hover:bg-yellow-500 text-black'
            }`}
            disabled={course.completed}
          >
            {course.completed ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

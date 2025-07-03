import React from 'react';
import { BookOpen, Play, CheckCircle, Award, ChevronRight, Star } from 'lucide-react';

const TrainingOverview = ({ userProgress, courses, getTypeIcon }) => (
  <div className="space-y-8">
    {/* Welcome Section */}
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome to CAT Training Hub</h2>
          <p className="text-lg opacity-90">Continue your learning journey with our comprehensive training programs</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{userProgress.skillLevel}</div>
          <div className="text-sm opacity-90">Current Level</div>
        </div>
      </div>
    </div>
    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-black">{userProgress.totalCourses}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <BookOpen className="w-8 h-8 text-yellow-400" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-black">{userProgress.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <Play className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-black">{userProgress.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-black">{userProgress.certifications}</div>
            <div className="text-sm text-gray-600">Certificates</div>
          </div>
          <Award className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
    {/* Featured Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-black mb-4">Continue Learning</h3>
        <div className="space-y-4">
          {courses.filter(course => !course.completed).slice(0, 3).map(course => (
            <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                {React.createElement(getTypeIcon(course.type), { className: "w-6 h-6 text-gray-600" })}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-black">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.duration}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-black mb-4">Recommended for You</h3>
        <div className="space-y-4">
          {courses.filter(course => course.difficulty === 'Intermediate').slice(0, 3).map(course => (
            <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                {React.createElement(getTypeIcon(course.type), { className: "w-6 h-6 text-gray-600" })}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-black">{course.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TrainingOverview;

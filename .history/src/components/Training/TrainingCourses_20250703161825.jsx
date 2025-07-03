import React from 'react';
import YouTube from 'react-youtube';
import { Clock, Users, User, Star } from 'lucide-react';
import CourseCard from './CourseCard';

const TrainingCourses = ({
  courses,
  selectedCourse,
  videoProgress,
  getTypeIcon,
  getTypeColor,
  getDifficultyColor,
  getVideoId,
  handleSelectCourse,
  handlePlayerReady,
  handlePlayerStateChange
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-black">Available Courses</h2>
      <div className="flex items-center space-x-4">
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>All Types</option>
          <option>Video</option>
          <option>Simulation</option>
          <option>Live</option>
          <option>Interactive</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>
    </div>
    {selectedCourse && selectedCourse.videoUrl && (
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="aspect-w-16 aspect-h-9 w-full mb-4">
              <YouTube
                videoId={getVideoId(selectedCourse.videoUrl)}
                opts={{ width: '100%', height: '400', playerVars: { rel: 0 } }}
                onReady={handlePlayerReady}
                onStateChange={(e) => handlePlayerStateChange(e, selectedCourse.id)}
              />
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${videoProgress[selectedCourse.id]?.percent || 0}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Watched: {videoProgress[selectedCourse.id]?.percent || 0}%
                {videoProgress[selectedCourse.id]?.completed && (
                  <span className="ml-2 text-green-600 font-semibold">(Completed)</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold mb-2 text-black">{selectedCourse.title}</h3>
            <p className="text-gray-700 mb-2">{selectedCourse.description}</p>
            <div className="flex items-center space-x-4 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedCourse.difficulty)}`}>{selectedCourse.difficulty}</span>
              <span className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{selectedCourse.duration}</span>
              </span>
              <span className="flex items-center space-x-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{selectedCourse.enrolled}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{selectedCourse.instructor}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedCourse.topics && selectedCourse.topics.map((topic, idx) => (
                <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">{topic}</span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{selectedCourse.rating}</span>
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          getTypeIcon={getTypeIcon}
          getTypeColor={getTypeColor}
          getDifficultyColor={getDifficultyColor}
          handleSelectCourse={handleSelectCourse}
        />
      ))}
    </div>
  </div>
);

export default TrainingCourses;

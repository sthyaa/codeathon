import React, { useState, useEffect } from 'react';
import { 
  Play, 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  Target, 
  ChevronRight,
  Monitor,
  User,
  Video,
  FileText,
  Gamepad2,
  Shield,
  Wrench,
  TrendingUp,
  CheckCircle,
  Lock,
  ArrowRight,
  Zap,
  Globe,
  Headphones,
  Settings,
  Download,
  Eye,
  Timer,
  Trophy,
  BarChart3,
  MessageSquare,
  Phone,
  MapPin,
  AlertTriangle,
  Fuel,
  Gauge
} from 'lucide-react';

const Training = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([1, 3, 5]);
  const [userProgress, setUserProgress] = useState({
    totalCourses: 12,
    completed: 3,
    inProgress: 2,
    skillLevel: 'Intermediate',
    totalHours: 24,
    certifications: 2
  });
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const learningPaths = [
    {
      id: 1,
      title: 'New Operator Certification',
      description: 'Complete certification program for new CAT machine operators',
      duration: '40 hours',
      level: 'Beginner',
      progress: 100,
      courses: 8,
      icon: Award,
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Safety Excellence Program',
      description: 'Advanced safety protocols and hazard recognition',
      duration: '20 hours',
      level: 'All Levels',
      progress: 60,
      courses: 6,
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      id: 3,
      title: 'Maintenance Mastery',
      description: 'Learn preventive maintenance and troubleshooting',
      duration: '30 hours',
      level: 'Intermediate',
      progress: 25,
      courses: 10,
      icon: Wrench,
      color: 'bg-blue-500'
    },
    {
      id: 4,
      title: 'Productivity Optimization',
      description: 'Advanced techniques for maximum efficiency',
      duration: '25 hours',
      level: 'Advanced',
      progress: 0,
      courses: 7,
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Cat® Operator Training: Excavator Safety & Controls',
      type: 'video',
      duration: '9 min',
      difficulty: 'Beginner',
      rating: 4.9,
      enrolled: 3200,
      completed: true,
      description: 'Learn about basic safety and controls for Cat excavators in this official operator training video.',
      videoUrl: 'https://www.youtube.com/embed/1Q8fG0TtVAY',
      instructor: 'Caterpillar University',
      topics: ['Excavator Safety', 'Controls', 'Best Practices']
    },
    {
      id: 2,
      title: 'Cat® Operator Training: Wheel Loader Tips',
      type: 'video',
      duration: '7 min',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2100,
      completed: false,
      description: 'Tips and best practices for operating Cat wheel loaders efficiently and safely.',
      videoUrl: 'https://www.youtube.com/embed/2Xc9gXyf2G4',
      instructor: 'Caterpillar University',
      topics: ['Wheel Loader', 'Efficiency', 'Safety']
    },
    {
      id: 3,
      title: 'Cat® Operator Training: Backhoe Loader Walkaround',
      type: 'video',
      duration: '8 min',
      difficulty: 'Beginner',
      rating: 4.7,
      enrolled: 1800,
      completed: false,
      description: 'A walkaround and introduction to Cat backhoe loaders, including safety and maintenance checks.',
      videoUrl: 'https://www.youtube.com/embed/3Q8fG0TtVAY',
      instructor: 'Caterpillar University',
      topics: ['Backhoe Loader', 'Walkaround', 'Maintenance']
    },
    {
      id: 4,
      title: 'Cat® Operator Training: Skid Steer Loader Operation',
      type: 'video',
      duration: '10 min',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: 'Learn how to operate Cat skid steer loaders with this official training video.',
      videoUrl: 'https://www.youtube.com/embed/4Xc9gXyf2G4',
      instructor: 'Caterpillar University',
      topics: ['Skid Steer Loader', 'Operation', 'Safety']
    }
  ];

  const instructors = [
    {
      id: 1,
      name: 'Mike Johnson',
      specialty: 'Machine Operations',
      rating: 4.9,
      experience: '15 years',
      students: 2500,
      avatar: '/api/placeholder/100/100',
      available: true,
      nextSlot: '2:00 PM Today'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      specialty: 'Hydraulic Systems',
      rating: 4.8,
      experience: '12 years',
      students: 1800,
      avatar: '/api/placeholder/100/100',
      available: false,
      nextSlot: '9:00 AM Tomorrow'
    },
    {
      id: 3,
      name: 'David Miller',
      specialty: 'Safety Training',
      rating: 4.9,
      experience: '20 years',
      students: 3200,
      avatar: '/api/placeholder/100/100',
      available: true,
      nextSlot: '4:00 PM Today'
    }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return Video;
      case 'simulation': return Gamepad2;
      case 'live': return Users;
      case 'interactive': return Target;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'video': return 'bg-blue-500';
      case 'simulation': return 'bg-purple-500';
      case 'live': return 'bg-green-500';
      case 'interactive': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePlayVideo = (course) => {
    setVideoUrl(course.videoUrl);
    setShowVideo(true);
  };

  const CourseCard = ({ course }) => {
    const TypeIcon = getTypeIcon(course.type);
    
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
        <div className="relative">
          <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            {course.type === 'video' && course.videoUrl ? (
              <button onClick={() => handlePlayVideo(course)} className="w-full h-full flex items-center justify-center">
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
              onClick={() => setSelectedCourse(course)}
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

  const LearningPathCard = ({ path }) => {
    const IconComponent = path.icon;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${path.color} flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            path.progress === 100 
              ? 'bg-green-100 text-green-800' 
              : path.progress > 0 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
          }`}>
            {path.progress === 100 ? 'Completed' : path.progress > 0 ? 'In Progress' : 'Not Started'}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-black mb-2">{path.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{path.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{path.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${path.progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{path.courses} courses</span>
            <span>{path.duration}</span>
            <span>{path.level}</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
          <span>{path.progress === 100 ? 'Review' : path.progress > 0 ? 'Continue' : 'Start Path'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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
                  <div className="text-2xl font-bold text-yellow-400">{userProgress.totalHours}</div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{userProgress.certifications}</div>
                  <div className="text-xs text-gray-400">Certificates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Monitor },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'instructors', label: 'Instructors', icon: Users },
              { id: 'paths', label: 'Learning Paths', icon: Target },
              { id: 'progress', label: 'Progress', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-yellow-400 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'overview' && (
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
        )}

        {activeTab === 'courses' && (
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'instructors' && (
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
        )}

        {activeTab === 'paths' && (
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
        )}

        {activeTab === 'progress' && (
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
        )}
      </main>

      {showVideo && videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-2xl w-full relative">
            <button onClick={() => setShowVideo(false)} className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">&times;</button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                width="100%"
                height="400"
                src={videoUrl}
                title="Training Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;
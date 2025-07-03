import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
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
import { auth, db } from '../lib/firebase';
import { ref as dbRef, get, set, update } from 'firebase/database';
import CourseCard from '../components/Training/CourseCard';
import InstructorCard from '../components/Training/InstructorCard';
import TrainingHeader from '../components/Training/TrainingHeader';
import TrainingTabs from '../components/Training/TrainingTabs';
import TrainingOverview from '../components/Training/TrainingOverview';
import TrainingCourses from '../components/Training/TrainingCourses';
import TrainingInstructors from '../components/Training/TrainingInstructors';
import LearningPathCard from '../components/Training/LearningPathCard';
import TrainingProgress from '../components/Training/TrainingProgress';

const Training = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([1, 3, 5]);
  const [userProgress, setUserProgress] = useState({
    totalCourses: 0,
    completed: 0,
    inProgress: 0,
    skillLevel: 'Intermediate',
    totalHours: 0
  });
  const [videoProgress, setVideoProgress] = useState({}); // { [courseId]: { percent: 0, completed: false } }
  const [player, setPlayer] = useState(null);
  const [progressInterval, setProgressInterval] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]); // If you need learning paths, add this line

  const tabDefs = [
    { id: 'overview', label: 'Overview', icon: Monitor },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'instructors', label: 'Instructors', icon: Users }
  ];

  // TODO: Fetch real data from Firebase or backend here
  useEffect(() => {
    const fetchCourses = async () => {
      // Replace with your Firebase fetching logic
      // Example: const snapshot = await get(dbRef(db, 'courses'));
      // if (snapshot.exists()) setCourses(Object.values(snapshot.val()));
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchInstructors = async () => {
      // Replace with your Firebase fetching logic
      // Example: const snapshot = await get(dbRef(db, 'instructors'));
      // if (snapshot.exists()) setInstructors(Object.values(snapshot.val()));
    };
    fetchInstructors();
  }, []);

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

  // Helper to extract YouTube video ID from embed URL
  const getVideoId = (url) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  // Real-time progress updater
  const startProgressTimer = (courseId) => {
    if (progressInterval) clearInterval(progressInterval);
    const interval = setInterval(() => {
      if (player && selectedCourse && selectedCourse.id === courseId) {
        const duration = player.getDuration();
        const current = player.getCurrentTime();
        if (duration > 0) {
          const percent = Math.floor((current / duration) * 100);
          // Use functional update to avoid race with Firebase reloads
          setVideoProgress(prev => {
            const prevPercent = prev[courseId]?.percent || 0;
            // Only update if percent increased and not completed
            if (percent > prevPercent && percent < 100) {
              return { ...prev, [courseId]: { percent, completed: false } };
            }
            // If completed, set completed true
            if (percent >= 100 && (!prev[courseId]?.completed)) {
              return { ...prev, [courseId]: { percent: 100, completed: true } };
            }
            return prev;
          });
        }
      }
    }, 1000);
    setProgressInterval(interval);
  };

  const stopProgressTimer = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
  };

  // Handler for YouTube player state changes
  const handlePlayerStateChange = (event, courseId) => {
    if (event.data === 1) { // Playing
      startProgressTimer(courseId);
    } else if (event.data === 2) { // Paused
      stopProgressTimer();
    } else if (event.data === 0) { // Ended
      stopProgressTimer();
      setVideoProgress((prev) => ({
        ...prev,
        [courseId]: { percent: 100, completed: true }
      }));
    }
  };

  // Load video progress from Firebase on mount
  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        const progressSnap = await get(dbRef(db, `users/${user.uid}/videoProgress`));
        if (progressSnap.exists()) {
          const progress = progressSnap.val();
          if (!selectedCourse) {
            setVideoProgress(progress);
          }
          // Calculate and set user progress stats after loading
          let completed = 0;
          let inProgress = 0;
          for (const course of courses) {
            const vid = progress[course.id];
            if (vid) {
              if (vid.completed === true) completed++;
              else if (vid.percent > 0 && vid.percent < 100 && vid.completed === false) inProgress++;
            }
          }
          setUserProgress(up => ({
            ...up,
            totalCourses: courses.length,
            completed,
            inProgress
          }));
        } else {
          if (!selectedCourse) {
            setVideoProgress({});
          }
          setUserProgress(up => ({ ...up, totalCourses: courses.length, completed: 0, inProgress: 0 }));
        }
      }
    };
    fetchProgress();
    // Optionally, listen for auth state changes if needed
  }, [courses, selectedCourse]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      setProgressError(null);
      const user = auth.currentUser;
      if (user) {
        try {
          const progressSnap = await get(dbRef(db, `users/${user.uid}/progress`));
          if (progressSnap.exists()) {
            setUserProgress(progressSnap.val());
          } else {
            setProgressError('No progress data found.');
          }
        } catch (err) {
          setProgressError('Error fetching progress data.');
        }
      }
    };
    fetchUserProgress();
  }, []);

  // Save progress for the current video to Firebase on tab/course change or page unload
  const saveCurrentVideoProgress = async (courseId) => {
    const user = auth.currentUser;
    if (user && courseId && videoProgress[courseId]) {
      await set(dbRef(db, `users/${user.uid}/videoProgress/${courseId}`), videoProgress[courseId]);
    }
  };

  // Handler for changing course (save progress before switching)
  const handleSelectCourse = async (course) => {
    if (selectedCourse && selectedCourse.id !== course.id) {
      await saveCurrentVideoProgress(selectedCourse.id);
    }
    setSelectedCourse(course);
  };

  // Handler for changing tab (save progress before switching)
  const handleTabChange = async (tabId) => {
    if (selectedCourse) {
      await saveCurrentVideoProgress(selectedCourse.id);
      setSelectedCourse(null);
    }
    setActiveTab(tabId);
  };

  // Save progress on page unload or route change
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (selectedCourse) {
        await saveCurrentVideoProgress(selectedCourse.id);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [selectedCourse, videoProgress]);

  const handlePlayerReady = (event) => {
    setPlayer(event.target);
  };

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
      title: 'How to Use 2D Grade Control on Cat Excavator',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.9,
      enrolled: 3200,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/ofVCAi96S98',
      instructor: 'Ziegler CAT',
      topics: ['2D Grade Control', 'Excavator']
    },
    {
      id: 2,
      title: 'How to Use Payload Feature on Cat Excavator',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2100,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/QEXjxF7LLPU',
      instructor: 'Ziegler CAT',
      topics: ['Payload', 'Excavator']
    },
    {
      id: 3,
      title: 'Safety Features in Cat D3 Series Machines',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.7,
      enrolled: 1800,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/wOCgGVrArCQ',
      instructor: 'Ziegler CAT',
      topics: ['Safety', 'D3 Series']
    },
    {
      id: 4,
      title: 'Proper turn technique on a Compact Track Loader',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/8IpqOs7h3f4',
      instructor: 'Ziegler CAT',
      topics: ['Turn Technique', 'Track Loader']
    },
    {
      id: 5,
      title: 'Loader Arm, Safety Lock Operation on Cat Skids and Track Loaders',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/GLAO3EZsLTo',
      instructor: 'Ziegler CAT',
      topics: ['Loader Arm', 'Safety Lock']
    },
    {
      id: 6,
      title: 'Safety Features - Cat Next Gen Excavators',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/KtKorcGeywg',
      instructor: 'Ziegler CAT',
      topics: ['Safety', 'Next Gen Excavators']
    },
    {
      id: 7,
      title: '2D Grade Control - Cat Next Gen Excavators',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/-9wMbrN8XL8',
      instructor: 'Ziegler CAT',
      topics: ['2D Grade Control', 'Next Gen Excavators']
    },
    {
      id: 8,
      title: 'Payload Feature - Cat Next Gen Excavators',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/CxPJ5uOA7bU',
      instructor: 'Ziegler CAT',
      topics: ['Payload', 'Next Gen Excavators']
    },
    {
      id: 9,
      title: 'E Fence Feature - Cat Next Gen Excavators',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/17z3VYlDVWQ',
      instructor: 'Ziegler CAT',
      topics: ['E Fence', 'Next Gen Excavators']
    },
    {
      id: 10,
      title: 'Cat Next Generation Excavators - Machine Walk Around',
      type: 'video',
      duration: '',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 2500,
      completed: false,
      description: '',
      videoUrl: 'https://www.youtube.com/embed/w8Y0upW5uvo',
      instructor: 'Ziegler CAT',
      topics: ['Walk Around', 'Next Gen Excavators']
    }
    // ...add more videos as needed from the playlist
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

  // ...existing code...

  return (
    <div className="min-h-screen bg-gray-100">
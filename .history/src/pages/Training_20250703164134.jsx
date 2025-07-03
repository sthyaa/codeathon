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
import LearningPathCard from '../components/Training/LearningPathCard';
import TrainingHeader from '../components/Training/TrainingHeader';
import TrainingTabs from '../components/Training/TrainingTabs';
import TrainingOverview from '../components/Training/TrainingOverview';
import TrainingCourses from '../components/Training/TrainingCourses';
import TrainingInstructors from '../components/Training/TrainingInstructors';
import TrainingPaths from '../components/Training/TrainingPaths';
import TrainingProgress from '../components/Training/TrainingProgress';

const Training = () => {
  // ...existing code from previous working version...
};

export default Training;

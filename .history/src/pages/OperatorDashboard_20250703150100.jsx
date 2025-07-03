import React, { useState, useEffect } from 'react';
import { 
  Award, Target, Zap, Fuel, Timer, Bell, Calendar, Camera, MessageSquare, BookOpen, BarChart3, Shield, User, Menu, Thermometer, Gauge, Battery, Clock
} from 'lucide-react';
import { getUserProfile, logout } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import OperatorSidebar from '@/components/OperatorSidebar';
import OperatorStatCard from '@/components/OperatorStatCard';
import OperatorTaskCard from '@/components/OperatorTaskCard';
import OperatorAlertCard from '@/components/OperatorAlertCard';

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskInProgress, setTaskInProgress] = useState(null);
  const [operatorData, setOperatorData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const { profile } = await getUserProfile(user.uid);
        if (profile) {
          setOperatorData(profile);
        }
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  }, []);

  const todayTasks = [
    { id: 1, title: 'Excavate Foundation Site A', location: 'Grid 12-A', estimatedTime: '2.5 hrs', status: 'completed', priority: 'high', progress: 100 },
    { id: 2, title: 'Load Dump Trucks - Gravel', location: 'Pit 3', estimatedTime: '3.0 hrs', status: 'in-progress', priority: 'medium', progress: 65 },
    { id: 3, title: 'Clear Drainage Ditch', location: 'Section B', estimatedTime: '1.5 hrs', status: 'pending', priority: 'low', progress: 0 },
    { id: 4, title: 'Equipment Maintenance Check', location: 'Yard', estimatedTime: '45 min', status: 'pending', priority: 'high', progress: 0 }
  ];

  const machineMetrics = {
    fuelLevel: 78,
    engineTemp: 180,
    hydraulicPressure: 3200,
    batteryLevel: 92,
    engineHours: 1530.2,
    idleTime: 12
  };

  const safetyAlerts = [
    { type: 'warning', message: 'Seatbelt reminder - Please ensure seatbelt is fastened', time: '10:30 AM' },
    { type: 'info', message: 'Weather alert: Light rain expected at 2:00 PM', time: '9:45 AM' }
  ];

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <OperatorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Header */}
      <header className="bg-black shadow-lg border-b-4 border-yellow-400">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="text-yellow-400 hover:text-yellow-300 p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">CAT Smart Assistant</h1>
                <p className="text-gray-400 text-sm">Welcome back, {loadingProfile ? '...' : operatorData?.name || 'Operator'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{currentTime.toLocaleTimeString()}</p>
                <p className="text-gray-400 text-sm">{currentTime.toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">{operatorData?.safetyScore ? `${operatorData.safetyScore}%` : '--'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="p-6">
        {/* Operator Info Card */}
        <div className="bg-black rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400">{loadingProfile ? 'Loading...' : operatorData?.name || 'Operator'}</h2>
                <p className="text-gray-400">ID: {operatorData?.id || '--'} • Machine: {operatorData?.machineId || '--'}</p>
                <p className="text-gray-400">{operatorData?.shift || '--'} • {operatorData?.experienceLevel || '--'}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Safety Score: {operatorData?.safetyScore ? `${operatorData.safetyScore}%` : '--'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Productivity: 96%</span>
              </div>
            </div>
          </div>
        </div>
        {/* Machine Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <OperatorStatCard icon={Fuel} title="Fuel Level" value={machineMetrics.fuelLevel} unit="%" />
          <OperatorStatCard icon={Thermometer} title="Engine Temp" value={machineMetrics.engineTemp} unit="°F" />
          <OperatorStatCard icon={Gauge} title="Hydraulic PSI" value={machineMetrics.hydraulicPressure} unit="" />
          <OperatorStatCard icon={Battery} title="Battery" value={machineMetrics.batteryLevel} unit="%" />
          <OperatorStatCard icon={Clock} title="Engine Hours" value={machineMetrics.engineHours} unit="hrs" />
          <OperatorStatCard icon={Timer} title="Idle Time" value={machineMetrics.idleTime} unit="min" />
        </div>
        {/* Alerts Section */}
        {safetyAlerts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-yellow-400" />
              Safety Alerts
            </h3>
            <div className="space-y-3">
              {safetyAlerts.map((alert, index) => (
                <OperatorAlertCard key={index} alert={alert} />
              ))}
            </div>
          </div>
        )}
        {/* Tasks Section */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
            Today's Tasks
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {todayTasks.map((task) => (
              <OperatorTaskCard key={task.id} task={task} setTaskInProgress={setTaskInProgress} />
            ))}
          </div>
        </div>
        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black p-4 rounded-lg font-medium transition-all duration-200 flex flex-col items-center space-y-2">
              <Camera className="w-6 h-6" />
              <span>Report Issue</span>
            </button>
            <button className="bg-black hover:bg-gray-800 text-white p-4 rounded-lg font-medium transition-all duration-200 flex flex-col items-center space-y-2">
              <MessageSquare className="w-6 h-6" />
              <span>Contact Support</span>
            </button>
            <button className="bg-black hover:bg-gray-800 text-white p-4 rounded-lg font-medium transition-all duration-200 flex flex-col items-center space-y-2">
              <BookOpen className="w-6 h-6" />
              <span>Training</span>
            </button>
            <button className="bg-black hover:bg-gray-800 text-white p-4 rounded-lg font-medium transition-all duration-200 flex flex-col items-center space-y-2">
              <BarChart3 className="w-6 h-6" />
              <span>View Reports</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperatorDashboard;
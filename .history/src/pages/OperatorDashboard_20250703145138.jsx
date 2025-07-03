import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  BookOpen, 
  Calendar, 
  Clock, 
  Gauge, 
  Shield, 
  TrendingUp, 
  User, 
  Wrench,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Settings,
  Award,
  Target,
  Zap,
  Fuel,
  Timer,
  MapPin,
  Bell,
  ChevronRight,
  BarChart3,
  Camera,
  MessageSquare,
  Thermometer,
  Wind,
  Battery,
  Droplet,
  Home,
  Menu,
  X
} from 'lucide-react';

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskInProgress, setTaskInProgress] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const operatorData = {
    name: 'John Martinez',
    id: 'OP1001',
    machineId: 'EXC001',
    shift: 'Day Shift',
    safetyScore: 94,
    experienceLevel: 'Expert'
  };

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-400';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-400';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-400';
    }
  };

  const StatCard = ({ icon: Icon, title, value, unit, color = 'text-yellow-400' }) => (
    <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {value} <span className="text-sm font-normal">{unit}</span>
          </p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  const TaskCard = ({ task }) => (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${getPriorityColor(task.priority)} hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black mb-2">{task.title}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {task.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {task.estimatedTime}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>
      
      {task.status === 'in-progress' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full ${
          task.priority === 'high' ? 'bg-red-100 text-red-800' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {task.priority.toUpperCase()} PRIORITY
        </span>
        {task.status === 'pending' && (
          <button 
            onClick={() => setTaskInProgress(task.id)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </button>
        )}
        {task.status === 'in-progress' && (
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1">
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        )}
        {task.status === 'completed' && (
          <CheckCircle className="w-6 h-6 text-green-500" />
        )}
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      alert.type === 'warning' ? 'bg-yellow-50 border-l-yellow-400' :
      alert.type === 'danger' ? 'bg-red-50 border-l-red-500' :
      'bg-blue-50 border-l-blue-400'
    }`}>
      <div className="flex items-start">
        <AlertTriangle className={`w-5 h-5 mt-0.5 mr-3 ${
          alert.type === 'warning' ? 'text-yellow-400' :
          alert.type === 'danger' ? 'text-red-500' :
          'text-blue-400'
        }`} />
        <div className="flex-1">
          <p className="text-sm font-medium text-black">{alert.message}</p>
          <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-black shadow-xl transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-yellow-400">CAT Assistant</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'tasks', label: 'Tasks', icon: Calendar },
            { id: 'safety', label: 'Safety', icon: Shield },
            { id: 'training', label: 'Training', icon: BookOpen },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-yellow-400 text-black' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
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
                <p className="text-gray-400 text-sm">Welcome back, {operatorData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{currentTime.toLocaleTimeString()}</p>
                <p className="text-gray-400 text-sm">{currentTime.toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">{operatorData.safetyScore}%</span>
              </div>
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
                <h2 className="text-xl font-bold text-yellow-400">{operatorData.name}</h2>
                <p className="text-gray-400">ID: {operatorData.id} • Machine: {operatorData.machineId}</p>
                <p className="text-gray-400">{operatorData.shift} • {operatorData.experienceLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Safety Score: {operatorData.safetyScore}%</span>
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
          <StatCard icon={Fuel} title="Fuel Level" value={machineMetrics.fuelLevel} unit="%" />
          <StatCard icon={Thermometer} title="Engine Temp" value={machineMetrics.engineTemp} unit="°F" />
          <StatCard icon={Gauge} title="Hydraulic PSI" value={machineMetrics.hydraulicPressure} unit="" />
          <StatCard icon={Battery} title="Battery" value={machineMetrics.batteryLevel} unit="%" />
          <StatCard icon={Clock} title="Engine Hours" value={machineMetrics.engineHours} unit="hrs" />
          <StatCard icon={Timer} title="Idle Time" value={machineMetrics.idleTime} unit="min" />
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
                <AlertCard key={index} alert={alert} />
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
              <TaskCard key={task.id} task={task} />
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
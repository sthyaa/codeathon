// OperatorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Award, Target, Zap, Fuel, Timer, Bell, Calendar, Camera, MessageSquare, BookOpen, BarChart3, Shield, User, Menu, Thermometer, Gauge, Battery, Clock } from 'lucide-react';
import { getUserProfile, logout } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import OperatorStatCard from '@/components/OperatorStatCard';

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [operatorData, setOperatorData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [taskPopup, setTaskPopup] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);

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

  useEffect(() => {
    if (!operatorData?.id) return;

    const tasksRef = ref(db, 'tasks/');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        Object.entries(data).forEach(([taskId, task]) => {
          if (task.operatorId === operatorData.id && task.status !== 'completed') {
            const alreadyExists = todayTasks.some(t => t.taskId === taskId);
            if (!alreadyExists) {
              toast.custom((t) => (
                <div
                  onClick={() => {
                    setTaskPopup({ ...task, taskId });
                    toast.dismiss(t.id);
                  }}
                  className="cursor-pointer bg-yellow-400 border-2 border-black px-4 py-3 rounded-lg shadow-lg text-black text-lg font-bold hover:bg-yellow-300 transition"
                >
                  📢 New Task Assigned! Click to View
                </div>
              ));
            }
          }
        });
      }
    });

    return () => unsubscribe();
  }, [operatorData, todayTasks]);

  const machineMetrics = {
    fuelLevel: 78,
    engineTemp: 180,
    hydraulicPressure: 3200,
    batteryLevel: 92,
    engineHours: 1530.2,
    idleTime: 12,
  };

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />} 
      <header className="bg-black shadow-lg border-b-4 border-yellow-400">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="text-yellow-400 hover:text-yellow-300 p-2">
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
            <button onClick={handleLogout} className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="bg-black rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-yellow-400">{loadingProfile ? 'Loading...' : operatorData?.name || 'Operator'}</h2>
              <p className="text-gray-400">ID: {operatorData?.id || '--'}{operatorData?.machineId ? ` • Machine: ${operatorData.machineId}` : ''}</p>
              <p className="text-gray-400">{operatorData?.shift || '--'} • {operatorData?.experienceLevel || '--'}</p>
            </div>
          </div>
        </div>

        {operatorData?.machineId && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <OperatorStatCard icon={Fuel} title="Fuel Level" value={machineMetrics.fuelLevel} unit="%" />
            <OperatorStatCard icon={Thermometer} title="Engine Temp" value={machineMetrics.engineTemp} unit="°F" />
            <OperatorStatCard icon={Gauge} title="Hydraulic PSI" value={machineMetrics.hydraulicPressure} unit="" />
            <OperatorStatCard icon={Battery} title="Battery" value={machineMetrics.batteryLevel} unit="%" />
            <OperatorStatCard icon={Clock} title="Engine Hours" value={machineMetrics.engineHours} unit="hrs" />
            <OperatorStatCard icon={Timer} title="Idle Time" value={machineMetrics.idleTime} unit="min" />
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
            Today's Tasks
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {todayTasks.map((task) => (
              <div key={task.taskId} className="bg-white border-2 border-black rounded-lg p-4 space-y-3 shadow">
                <h3 className="text-xl font-bold text-black">{task.taskName}</h3>
                <p><strong>Location:</strong> {task.location}</p>
                <p><strong>Priority:</strong> {task.priority || 'N/A'}</p>
                <p><strong>Estimated Time:</strong> {task.estimatedTime || 'N/A'}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div className="bg-yellow-400 h-4 rounded-full" style={{ width: `${task.progress || 0}%` }} />
                </div>
                {(task.progress || 0) < 100 && (
                  <button
                    onClick={async () => {
                      // Update local state
                      const updated = todayTasks.map(t =>
                        t.taskId === task.taskId ? { ...t, progress: 100 } : t
                      );
                      setTodayTasks(updated);
                      // Update Firebase: set status to 'completed' and completedBy to operator name
                      try {
                        const { id: operatorId, name: operatorName } = operatorData || {};
                        if (task.taskId) {
                          const { ref: dbRef, set: dbSet, update: dbUpdate, get: dbGet } = await import('firebase/database');
                          const { db } = await import('@/lib/firebase');
                          const taskRef = dbRef(db, `tasks/${task.taskId}`);
                          await dbSet(taskRef, {
                            ...task,
                            status: 'completed',
                            completedBy: operatorName || 'Operator',
                            progress: 100
                          });
                          // Update machine data
                          if (task.machineId) {
                            const machineRef = dbRef(db, `machines/${task.machineId}`);
                            // Get current machine data
                            const snap = await dbGet(machineRef);
                            if (snap.exists()) {
                              const machine = snap.val();
                              // Simulate new values (increment or randomize for demo)
                              const newFuelUsed = (machine.fuelUsed || 0) + Math.floor(Math.random() * 10) + 5;
                              const newLoadCycles = (machine.loadCycles || 0) + Math.floor(Math.random() * 5) + 1;
                              const newIdlingTime = (machine.idlingTime || 0) + Math.floor(Math.random() * 3) + 1;
                              await dbUpdate(machineRef, {
                                fuelUsed: newFuelUsed,
                                loadCycles: newLoadCycles,
                                idlingTime: newIdlingTime,
                                status: 'idle',
                                assignedoperatorid: '',
                                currenttaskId: ''
                              });
                            }
                          }
                        }
                      } catch (err) {
                        toast.error('Failed to update task or machine status.');
                      }
                    }}
                    className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded-lg border-2 border-black font-medium hover:bg-yellow-300"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {taskPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white border-2 border-black p-6 rounded-lg w-full max-w-md text-black space-y-4">
              <h2 className="text-2xl font-bold mb-2 text-center">Task Details</h2>
              <p><strong>Task Name:</strong> {taskPopup.taskName}</p>
              <p><strong>Machine ID:</strong> {taskPopup.machineId}</p>
              <p><strong>Operator ID:</strong> {taskPopup.operatorId}</p>
              <p><strong>Location:</strong> {taskPopup.location}</p>
              <p><strong>Priority:</strong> {taskPopup.priority}</p>
              <div className="pt-4 flex justify-center">
                <button
                  className="px-4 py-2 bg-yellow-400 text-black font-medium border-2 border-black rounded-lg hover:bg-yellow-300"
                  onClick={async () => {
                    setTodayTasks([...todayTasks, { ...taskPopup, progress: 0 }]);
                    setTaskPopup(null);
                    // Update machine status to 'active' and assign operator/task
                    try {
                      if (taskPopup.machineId) {
                        const { ref: dbRef, update: dbUpdate } = await import('firebase/database');
                        const { db } = await import('@/lib/firebase');
                        const machineRef = dbRef(db, `machines/${taskPopup.machineId}`);
                        await dbUpdate(machineRef, {
                          status: 'active',
                          assignedoperatorid: operatorData?.id || '',
                          currenttaskId: taskPopup.taskId || ''
                        });
                      }
                    } catch (err) {
                      toast.error('Failed to update machine status.');
                    }
                  }}
                >
                  Add to Tasks
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default OperatorDashboard;
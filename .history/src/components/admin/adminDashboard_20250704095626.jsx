import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { db, logout } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import Header from './Header';
import NavigationTabs from './NavigationTabs';
import TaskFormModal from './TaskFormModal';
import ScheduledTasksList from './ScheduledTasksList';
import ProgressSection from './ProgressSection';
import ReportsSection from './ReportsSection';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [machines, setMachines] = useState([]);
  const [operators, setOperators] = useState([]);
  const [taskForm, setTaskForm] = useState({
    taskName: '',
    machineId: '',
    operatorId: '',
    location: '',
    priority: 'Normal' // Add priority field with default value
  });
  const [predictedTime, setPredictedTime] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [adminUid, setAdminUid] = useState(null);

  const navigate = useNavigate();

  // Helper to generate random environmental condition
  const ENV_OPTIONS = ['Sunny', 'Rainy', 'Cloudy', 'Windy', 'Dusty']; // Removed 'Foggy'
  function getRandomEnv() {
    return ENV_OPTIONS[Math.floor(Math.random() * ENV_OPTIONS.length)];
  }

  useEffect(() => {
    // Get current admin UID
    const auth = getAuth();
    setAdminUid(auth.currentUser?.uid || null);
  }, []);

  useEffect(() => {
    const tasksRef = ref(db, 'tasks/');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const taskArray = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .filter(task => !adminUid || task.createdBy === adminUid);
        setTasks(taskArray);
      } else {
        setTasks([]);
      }
    });

    // Fetch machines for dropdown
    const machinesRef = ref(db, 'machines/');
    const unsubscribeMachines = onValue(machinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMachines(Object.values(data));
      } else {
        setMachines([]);
      }
    });

    // Fetch operators for dropdown
    const operatorsRef = ref(db, 'users/');
    const unsubscribeOperators = onValue(operatorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Only include users with role 'operator'
        setOperators(Object.values(data).filter(user => user.role === 'operator'));
      } else {
        setOperators([]);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeMachines();
      unsubscribeOperators();
    };
  }, [adminUid]);

  // Predict task time when all fields are selected
  useEffect(() => {
    const fetchPrediction = async () => {
      const { taskName, machineId, operatorId } = taskForm;
      if (taskName && machineId && operatorId) {
        // Find machine and operator objects
        const machine = machines.find(m => m.machineid === machineId);
        const operator = operators.find(o => (o.id || o.uid) === operatorId);
        if (!machine || !operator) return;
        // Check for missing machine data
        if (
          machine.fuelUsed == null && machine.fuel_used == null ||
          machine.engineHours == null && machine.engine_hours == null ||
          machine.loadCycles == null && machine.curr_load_cycles == null ||
          machine.idlingTime == null && machine.idling_time == null
        ) {
          setPredictedTime('Machine data incomplete');
          return;
        }
        // Prepare payload for prediction (use only real values)
        const payload = {
          task_type: taskName,
          machine_type: machine.type,
          machine_fuel_used: machine.fuelUsed ?? machine.fuel_used,
          engine_hours: machine.engineHours ?? machine.engine_hours,
          curr_load_cycles: machine.loadCycles ?? machine.curr_load_cycles,
          idling_time: machine.idlingTime ?? machine.idling_time,
          environmental_conditions: getRandomEnv(),
          operator_level: operator.level || 1
        };
        setPredicting(true);
        setPredictedTime(null);
        try {
          const res = await axios.post('http://localhost:5000/predict', payload);
          setPredictedTime(res.data.predicted_time);
        } catch (err) {
          setPredictedTime('Error');
        } finally {
          setPredicting(false);
        }
      } else {
        setPredictedTime(null);
      }
    };
    fetchPrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskForm.taskName, taskForm.machineId, taskForm.operatorId]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('Logged out successfully');
      navigate('/');
    } else {
      toast.error('Logout failed: ' + result.error);
    }
  };

  const PRIORITY_OPTIONS = ['High', 'Normal', 'Low'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { taskName, machineId, operatorId, location, priority } = taskForm;

    if (taskName && machineId && operatorId && location && priority) {
      try {
        const newTaskRef = push(ref(db, 'tasks/'));
        const taskId = newTaskRef.key; // Get the unique task id generated by push
        await set(newTaskRef, {
          taskId, // Store the taskId in the task object
          taskName,
          machineId,
          operatorId,
          location,
          priority, // Store priority
          createdAt: new Date().toISOString(),
          estimatedTime: (typeof predictedTime === 'number' && !isNaN(predictedTime)) ? predictedTime : (Number(predictedTime) || null),
          createdBy: adminUid // Track which admin created this task
        });

        // eslint-disable-next-line no-console
        console.log(`🔔 Notify Operator ${operatorId}: New job assigned`);
        setTaskForm({ taskName: '', machineId: '', operatorId: '', location: '', priority: 'Normal' });
        setShowTaskForm(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding task:', error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    const taskRef = ref(db, `tasks/${id}`);
    await remove(taskRef);
  };

  // Map machine types to real-world task names for the dropdown
  const MACHINE_TYPE_TO_TASK = {
    'Excavator': 'Excavation',
    'Bulldozer': 'Bulldozing',
    'Backhoe': 'Backhoeing',
    'Loader': 'Loading',
    'Dump Truck': 'Hauling',
    'Grader': 'Site Grading',
    // Add more mappings as needed
  };
  const availableMachineTypes = Array.from(new Set(machines.map(m => m.type)));
  const TASK_OPTIONS = availableMachineTypes
    .map(type => MACHINE_TYPE_TO_TASK[type])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} handleLogout={handleLogout} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Schedule Management</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  style={{ backgroundColor: '#FFCD11', color: '#000000' }}
                >
                  <span>＋</span><span>Add New Task</span>
                </button>
              </div>
            </div>
            <TaskFormModal
              show={showTaskForm}
              onClose={() => setShowTaskForm(false)}
              onSubmit={handleSubmit}
              taskForm={taskForm}
              handleInputChange={handleInputChange}
              TASK_OPTIONS={TASK_OPTIONS}
              machines={machines}
              operators={operators}
              predictedTime={predictedTime}
              predicting={predicting}
              PRIORITY_OPTIONS={PRIORITY_OPTIONS} // Pass priority options to modal
            />
            <ScheduledTasksList
              tasks={tasks}
              handleDeleteTask={handleDeleteTask}
              setActiveTab={setActiveTab}
              showCompletedFadeout // Pass prop to show fadeout for completed tasks
            />
          </div>
        )}
        {activeTab === 'progress' && <ProgressSection />}
        {activeTab === 'reports' && <ReportsSection />}
      </main>
    </div>
  );
};

export default AdminDashboard;
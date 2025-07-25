import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { db } from '@/lib/firebase';
import axios from 'axios';

import {
  Calendar,
  Plus,
  X,
  BarChart3,
  FileText,
  GaugeCircle,
  ListChecks,
  LogOut
} from 'lucide-react';

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
    location: ''
  });
  const [predictedTime, setPredictedTime] = useState(null);
  const [predicting, setPredicting] = useState(false);

  const navigate = useNavigate();

  // Helper to generate random environmental condition
  const ENV_OPTIONS = ['Sunny', 'Rainy', 'Cloudy', 'Windy', 'Foggy', 'Dusty'];
  function getRandomEnv() {
    return ENV_OPTIONS[Math.floor(Math.random() * ENV_OPTIONS.length)];
  }

  useEffect(() => {
    const tasksRef = ref(db, 'tasks/');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const taskArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
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
  }, []);

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

  const handleLogout = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { taskName, machineId, operatorId, location } = taskForm;

    if (taskName && machineId && operatorId && location) {
      try {
        const newTaskRef = push(ref(db, 'tasks/'));
        const taskId = newTaskRef.key; // Get the unique task id generated by push
        await set(newTaskRef, {
          taskId, // Store the taskId in the task object
          taskName,
          machineId,
          operatorId,
          location,
          createdAt: new Date().toISOString()
        });

        // eslint-disable-next-line no-console
        console.log(`🔔 Notify Operator ${operatorId}: New job assigned`);
        setTaskForm({ taskName: '', machineId: '', operatorId: '', location: '' });
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

  const TASK_OPTIONS = [
    'Excavation',
    'Loading',
    'Hauling',
    'Site Grading',
    'Material Handling',
    'Maintenance',
    'Inspection',
    'Fueling',
    'Operator Training',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <span className="text-sm">Welcome, Admin</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFCD11' }}>
                  <span className="font-medium text-black">A</span>
                </div>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-black rounded shadow z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-black hover:bg-gray-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-8">
          {['schedule', 'progress', 'reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors text-white ${activeTab === tab ? 'border-b-[2px]' : ''}`}
              style={{ borderBottomColor: activeTab === tab ? '#FFCD11' : 'transparent' }}
            >
              {tab === 'schedule' ? 'Schedule' : tab === 'progress' ? 'View Progress' : 'Report Summary'}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Schedule Management</h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                style={{ backgroundColor: '#FFCD11', color: '#000000' }}
              >
                <Plus className="h-4 w-4" /><span>Add New Task</span>
              </button>
            </div>

            {showTaskForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-2 border-black">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Create New Task</h3>
                    <button onClick={() => setShowTaskForm(false)} className="text-black hover:text-gray-700">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Task Name Dropdown */}
                    <select
                      name="taskName"
                      value={taskForm.taskName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border-2 border-black"
                      required
                    >
                      <option value="" disabled>Select Task</option>
                      {TASK_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {/* Machine ID Dropdown */}
                    <select
                      name="machineId"
                      value={taskForm.machineId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border-2 border-black"
                      required
                    >
                      <option value="" disabled>Select Machine</option>
                      {machines.map(machine => (
                        <option key={machine.machineid} value={machine.machineid}>{machine.machineid} ({machine.type})</option>
                      ))}
                    </select>
                    {/* Operator ID Dropdown */}
                    <select
                      name="operatorId"
                      value={taskForm.operatorId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border-2 border-black"
                      required
                    >
                      <option value="" disabled>Select Operator</option>
                      {operators.map(operator => {
                        // Show level as number and label
                        let levelLabel = 'Beginner';
                        if (operator.level === 2) levelLabel = 'Intermediate';
                        else if (operator.level === 3) levelLabel = 'Advanced';
                        return (
                          <option key={operator.id || operator.uid} value={operator.id || operator.uid}>
                            {operator.name || operator.displayName || operator.email} (Level {operator.level || 1} - {levelLabel})
                          </option>
                        );
                      })}
                    </select>
                    {/* Location remains as text input */}
                    <input
                      type="text"
                      name="location"
                      value={taskForm.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="w-full px-3 py-2 rounded-lg border-2 border-black"
                      required
                    />
                    {/* Display predicted time */}
                    {predictedTime !== null && (
                      <div className="text-center text-black font-medium mb-2">
                        {predicting ? 'Calculating estimated time...' :
                          predictedTime === 'Error' ? 'Prediction failed.' :
                          `Estimated Task Time: ${predictedTime} minutes`}
                      </div>
                    )}
                    <div className="flex space-x-3 pt-4">
                      <button type="submit" className="flex-1 py-2 px-4 rounded-lg font-medium bg-[#FFCD11] text-black">Create Task</button>
                      <button type="button" onClick={() => setShowTaskForm(false)} className="flex-1 py-2 px-4 rounded-lg font-medium bg-black text-white">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="rounded-lg border-2 border-black bg-white">
              <div className="px-6 py-4 border-b border-black">
                <h3 className="text-lg font-medium flex items-center"><Calendar className="h-5 w-5 mr-2" />Scheduled Tasks</h3>
              </div>
              <div className="p-6">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No tasks scheduled yet</div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-4 rounded-lg bg-[#FFCD11] border border-black">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-medium text-black">{task.taskName}</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm text-black">
                              <div><strong>Machine ID: </strong>{task.machineId}</div>
                              <div><strong>Operator ID: </strong>{task.operatorId}</div>
                              <div className="col-span-2"><strong>Location: </strong>{task.location}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <button
                              onClick={() => setActiveTab('progress')}
                              className="mb-2 px-3 py-1 rounded bg-black text-white text-xs font-medium hover:bg-gray-800"
                            >
                              View Progress
                            </button>
                            <button onClick={() => handleDeleteTask(task.id)} className="text-red-600 hover:text-red-800">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">View Progress</h2>
            {[{ title: 'Operator Progress', Icon: BarChart3 }, { title: 'Machine Progress', Icon: GaugeCircle }, { title: 'Task Progress', Icon: ListChecks }].map(({ title, Icon }) => (
              <div key={title} className="rounded-lg border-2 border-black bg-white">
                <div className="px-6 py-4 border-b border-black">
                  <h3 className="text-lg font-medium flex items-center"><Icon className="h-5 w-5 mr-2" />{title}</h3>
                </div>
                <div className="p-6 text-center py-12">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-[#FFCD11]" />
                  <p className="text-lg font-medium">No Data Found</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Report Summary</h2>
            <div className="rounded-lg border-2 border-black bg-white">
              <div className="px-6 py-4 border-b border-black">
                <h3 className="text-lg font-medium flex items-center"><FileText className="h-5 w-5 mr-2" />Generated Reports</h3>
              </div>
              <div className="p-6 text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-[#FFCD11]" />
                <p className="text-lg font-medium">No Report Found</p>
                <p className="text-sm mt-2">Reports will be generated automatically once tasks are completed</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
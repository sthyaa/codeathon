import React, { useState } from 'react';
import { X } from 'lucide-react';

const ScheduledTasksList = ({ tasks, handleDeleteTask, setActiveTab }) => {
  const [fadedTasks, setFadedTasks] = useState([]);
  const handleFadeOut = (taskId) => {
    setFadedTasks((prev) => [...prev, taskId]);
    setTimeout(() => {
      handleDeleteTask(taskId);
    }, 1200); // Fade out duration
  };
  return (
    <div className="rounded-lg border-2 border-black bg-white">
      <div className="px-6 py-4 border-b border-black">
        <h3 className="text-lg font-medium flex items-center">Scheduled Tasks</h3>
      </div>
      <div className="p-6">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No tasks scheduled yet</div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = task.status === 'completed';
              const isFading = fadedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg bg-[#FFCD11] border border-black transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-medium text-black">{task.taskName}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm text-black">
                        <div><strong>Machine ID: </strong>{task.machineId}</div>
                        <div><strong>Operator ID: </strong>{task.operatorId}</div>
                        <div><strong>Priority: </strong>{task.priority || 'N/A'}</div>
                        <div className="col-span-2"><strong>Location: </strong>{task.location}</div>
                        {typeof task.estimatedTime === 'number' && !isNaN(task.estimatedTime) ? (
                          <div className="col-span-2"><strong>Estimated Time: </strong>{task.estimatedTime} minutes</div>
                        ) : (Number(task.estimatedTime) ? (
                          <div className="col-span-2"><strong>Estimated Time: </strong>{Number(task.estimatedTime)} minutes</div>
                        ) : null)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {!isCompleted && (
                        <button
                          onClick={() => setActiveTab('progress')}
                          className="mb-2 px-3 py-1 rounded bg-black text-white text-xs font-medium hover:bg-gray-800"
                        >
                          View Progress
                        </button>
                      )}
                      <button onClick={() => handleDeleteTask(task.id)} className="text-red-600 hover:text-red-800">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {isCompleted && !isFading && (
                    <div className="mt-3 text-green-700 font-bold text-center animate-pulse">
                      Task Completed! This card will fade out.
                      <button
                        className="ml-2 px-2 py-1 text-xs bg-black text-white rounded"
                        onClick={() => handleFadeOut(task.id)}
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledTasksList;

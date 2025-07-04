import React from 'react';

const TaskFormModal = ({ show, onClose, onSubmit, taskForm, handleInputChange, TASK_OPTIONS, machines, operators, predictedTime, predicting }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-2 border-black">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Create New Task</h3>
          <button onClick={onClose} className="text-black hover:text-gray-700">
            ✕
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <select name="taskName" value={taskForm.taskName} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border-2 border-black" required>
            <option value="" disabled>Select Task</option>
            {TASK_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select name="machineId" value={taskForm.machineId} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border-2 border-black" required>
            <option value="" disabled>Select Machine</option>
            {machines.map(machine => (
              <option key={machine.machineid} value={machine.machineid}>{machine.machineid} ({machine.type})</option>
            ))}
          </select>
          <select name="operatorId" value={taskForm.operatorId} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border-2 border-black" required>
            <option value="" disabled>Select Operator</option>
            {operators.map(operator => {
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
          <input type="text" name="location" value={taskForm.location} onChange={handleInputChange} placeholder="Location" className="w-full px-3 py-2 rounded-lg border-2 border-black" required />
          {predictedTime !== null && (
            <div className="text-center text-black font-medium mb-2">
              {predicting ? 'Calculating estimated time...' : predictedTime === 'Error' ? 'Prediction failed.' : `Estimated Task Time: ${predictedTime} minutes`}
            </div>
          )}
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 py-2 px-4 rounded-lg font-medium bg-[#FFCD11] text-black">Create Task</button>
            <button type="button" onClick={onClose} className="flex-1 py-2 px-4 rounded-lg font-medium bg-black text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;

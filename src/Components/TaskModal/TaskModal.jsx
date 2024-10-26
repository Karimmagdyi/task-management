// TaskModal.js
import React from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, currentTask, isAddingTask, onClose, onSubmit, setCurrentTask }) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setCurrentTask(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isAddingTask ? 'Add New Task' : 'Edit Task'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <input
          type="text"
          value={currentTask.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={currentTask.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Task Description"
          className="w-full p-2 mb-4 border rounded"
          rows="3"
        />
        <select
          value={currentTask.priority}
          onChange={(e) => handleInputChange('priority', e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={currentTask.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="text"
          value={currentTask.assignedTo.join(', ')}
          onChange={(e) => handleInputChange('assignedTo', e.target.value.split(', '))}
          placeholder="Assigned To (comma-separated user IDs)"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isAddingTask ? 'Add Task' : 'Update Task'}
        </button>
      </div>
    </div>
  );
};

export default TaskModal;

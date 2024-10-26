// TaskItem.js
import React from 'react';
import { Trash2, Edit2, UserCheck } from 'lucide-react';

const priorityColors = {
  Low: 'bg-green-200 text-green-800',
  Medium: 'bg-yellow-200 text-yellow-800',
  High: 'bg-red-200 text-red-800',
};

const TaskItem = ({ task, onEdit, onDelete, onStatusChange, canEditTask, canUpdateStatus }) => {
  return (
    <div className="bg-gray-50 p-4 mb-4 rounded border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        {canEditTask && (
          <button onClick={() => onDelete(task)} className="text-red-500 hover:text-red-700 ml-2" aria-label="Delete task">
            <Trash2 size={20} />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">State: {task.state}</span>
        {canEditTask && (
          <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700 text-sm">
            <Edit2 size={16} />
          </button>
        )}
        {canUpdateStatus && (
          <select
            value={task.state}
            onChange={(e) => onStatusChange(task, e.target.value)}
            className="text-sm border rounded p-1"
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <UserCheck size={14} className="inline mr-1" />
        Assigned to: {task.assignedTo.join(', ')}
      </div>
    </div>
  );
};

export default TaskItem;

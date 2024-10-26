// TaskList.js
import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ columnId, columnTasks, onEdit, onDelete, onStatusChange, canEditTask, canUpdateStatus }) => {
  return (
    <div className="flex-1 mx-2 min-w-[300px]">
      <h2 className="text-xl font-bold mb-4 capitalize">{columnId}</h2>
      <div className="bg-white rounded-lg shadow p-4 min-h-[200px]">
        {columnTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            canEditTask={canEditTask(task)}
            canUpdateStatus={canUpdateStatus(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

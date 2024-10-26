// Home.js
import React, { useState, useEffect } from "react";
import TaskList from "../TaskList/TaskList";
import TaskModal from "../TaskModal/TaskModal";
import TaskService from "../../services/TaskServices";
import { Search, Filter, Plus } from "lucide-react";

// Mock user data (in a real app, this would come from authentication)
const currentUser = {
  id: "user-1",
  name: "karim magdy",
  role: "owner",
};

const initialTasks = {
  todo: [
    {
      id: "task-1",
      title: "Create login page",
      description: "Implement user login functionality",
      image: "/placeholder.svg?height=100&width=100",
      priority: "High",
      state: "Todo",
      owner: "user-1",
      assignedTo: ["user-2"],
    },
    {
      id: "task-2",
      title: "Design database schema",
      description: "Create ERD for the application",
      image: "/placeholder.svg?height=100&width=100",
      priority: "Medium",
      state: "Todo",
      owner: "user-2",
      assignedTo: ["user-1"],
    },
  ],
  doing: [
    {
      id: "task-3",
      title: "Implement user authentication",
      description: "Set up JWT for user auth",
      image: "/placeholder.svg?height=100&width=100",
      priority: "High",
      state: "Doing",
      owner: "user-1",
      assignedTo: ["user-2", "user-3"],
    },
  ],
  done: [
    {
      id: "task-4",
      title: "Set up project repository",
      description: "Initialize Git repo and push initial commit",
      image: "/placeholder.svg?height=100&width=100",
      priority: "Low",
      state: "Done",
      owner: "user-3",
      assignedTo: ["user-1"],
    },
  ],
};

const Home = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    const filtered = Object.entries(tasks).reduce(
      (acc, [columnId, columnTasks]) => {
        acc[columnId] = columnTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (priorityFilter === "All" || task.priority === priorityFilter)
        );
        return acc;
      },
      {}
    );
    setFilteredTasks(filtered);
  }, [searchTerm, priorityFilter, tasks]);

  const closeTaskModal = () => {
    TaskService.closeTaskModal(setCurrentTask, setIsModalOpen, setIsAddingTask);
  };

  const addOrUpdateTask = () => {
    TaskService.addOrUpdateTask(currentTask, isAddingTask, setTasks, currentUser, closeTaskModal);
  };

  const openAddTaskModal = () => {
    TaskService.openAddTaskModal(setCurrentTask, setIsAddingTask, setIsModalOpen, currentUser);
  };

  const openEditTaskModal = (task) => {
    TaskService.openEditTaskModal(setCurrentTask, setIsAddingTask, setIsModalOpen, task);
  };

  const deleteTask = (taskToDelete) => {
    TaskService.deleteTask(taskToDelete, currentUser, setTasks);
  };

  const updateTaskStatus = (task, newStatus) => {
    TaskService.updateTaskStatus(task, newStatus, currentUser, setTasks);
  };

  const canEditTask = (task) => task.owner === currentUser.id;

  const canUpdateStatus = (task) => task.assignedTo.includes(currentUser.id);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="appearance-none pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        
        </div>
        
        <button
          onClick={openAddTaskModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-1 flex-col md:flex-row overflow-x-auto">
        {Object.entries(filteredTasks).map(([columnId, columnTasks]) => (
          <TaskList
            key={columnId}
            columnId={columnId}
            columnTasks={columnTasks}
            onEdit={openEditTaskModal}
            onDelete={deleteTask}
            onStatusChange={updateTaskStatus}
            canEditTask={canEditTask}
            canUpdateStatus={canUpdateStatus}
          />
        ))}
      </div>
      <TaskModal
        isOpen={isModalOpen}
        currentTask={currentTask}
        isAddingTask={isAddingTask}
        onClose={closeTaskModal}
        onSubmit={addOrUpdateTask}
        setCurrentTask={setCurrentTask}
      />
    </div>
  );
};

export default Home;

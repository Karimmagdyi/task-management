// services/TaskService.js

const TaskService = {
    openAddTaskModal(setCurrentTask, setIsAddingTask, setIsModalOpen, currentUser) {
      setCurrentTask({
        id: `task-${Date.now()}`,
        title: '',
        description: '',
        image: '/placeholder.svg?height=100&width=100',
        priority: 'Medium',
        state: 'Todo',
        owner: currentUser.id,
        assignedTo: []
      });
      setIsAddingTask(true);
      setIsModalOpen(true);
    },
  
    openEditTaskModal(setCurrentTask, setIsAddingTask, setIsModalOpen, task) {
      setCurrentTask(task);
      setIsAddingTask(false);
      setIsModalOpen(true);
    },
  
    closeTaskModal(setCurrentTask, setIsModalOpen, setIsAddingTask) {
      setCurrentTask(null);
      setIsModalOpen(false);
      setIsAddingTask(false);
    },
  
    addOrUpdateTask(currentTask, isAddingTask, setTasks, currentUser, closeTaskModal) {
      if (!currentTask) return;
  
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };        
        const targetState = currentTask.state.toLowerCase();
  
        if (isAddingTask) {
          newTasks[targetState] = [
            ...newTasks[targetState], 
            { ...currentTask, owner: currentUser.id }
          ];
        } else {
          Object.keys(newTasks).forEach(state => {            
            newTasks[state] = newTasks[state].map(task => 
              task.id === currentTask.id ? { ...currentTask, owner: task.owner } : task
            );
          });
        }
  
        return newTasks;
      });
  
      closeTaskModal();
    },
  
    deleteTask(taskToDelete, currentUser, setTasks) {
      if (taskToDelete.owner !== currentUser.id) {
        alert("You don't have permission to delete this task.");
        return;
      }
  
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        Object.keys(newTasks).forEach(state => {
          newTasks[state] = newTasks[state].filter(task => task.id !== taskToDelete.id);
        });
        return newTasks;
      });
    },
  
    updateTaskStatus(task, newStatus, currentUser, setTasks) {
      if (task.owner !== currentUser.id && !task.assignedTo.includes(currentUser.id)) {
        alert("You don't have permission to update this task's status.");
        return;
      }
  
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        const oldStatus = task.state.toLowerCase();
        const updatedTask = { ...task, state: newStatus };
  
        newTasks[oldStatus] = newTasks[oldStatus].filter(t => t.id !== task.id);
        newTasks[newStatus.toLowerCase()] = [...newTasks[newStatus.toLowerCase()], updatedTask];
  
        return newTasks;
      });
    }
  };
  
  export default TaskService;
  
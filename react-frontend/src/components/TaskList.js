// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const response = await axios.get('http://127.0.0.1:5000/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = (savedTask) => {
    if (editingTask) {
      setTasks(tasks.map(task => (task.id === savedTask.id ? savedTask : task)));
    } else {
      setTasks([...tasks, savedTask]);
    }
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  const handleDelete = (deletedTaskId) => {
    setTasks(tasks.filter(task => task.id !== deletedTaskId));
    setEditingTask (null);
  };

  const handleStatusChange = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm task={editingTask} onSave={handleSave} onCancel={handleCancel} />
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;

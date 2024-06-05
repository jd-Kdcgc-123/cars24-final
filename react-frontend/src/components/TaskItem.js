// src/components/TaskItem.js
import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const handleDelete = async () => {
    await axios.delete(`http://127.0.0.1:5000/tasks/${task.id}`);
    onDelete(task.id);
  };

  const handleStatusChange = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    await axios.put(`http://127.0.0.1:5000/tasks/${task.id}`, updatedTask);
    onStatusChange(updatedTask);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p className='desc'>{task.description}</p>
        <div className='status'>
          <input
            type="checkbox"
            checked={task.status}
            onChange={handleStatusChange}
          />
          <label>{task.completed ? 'Completed' : 'Not Completed'}</label>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(task)} className="edit-btn">Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

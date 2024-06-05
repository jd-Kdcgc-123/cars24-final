// src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ task, onSave, onCancel }) => {
  const [id, setId] = useState(task ? task.id : "");
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : false);
  const [expanded, setExpanded] = useState(!!task);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { id, title, description, status };

    if (task) {
      // Update existing task
      await axios.put(
        `http://127.0.0.1:5000/tasks/${task.id}`,
        newTask
      );
      onSave(newTask);
    } else {
      // Create new task
      await axios
        .post(`http://127.0.0.1:5000/tasks/`, newTask, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          onSave (response.data);
        })
        .catch((error) => {
          console.error("There was an error creating the task:", error);
        });
    }

    setId("");
    setTitle("");
    setDescription("");
    setStatus(false);
    setExpanded(false);
  };

  const handleCancel = () => {
    setId("");
    setTitle("");
    setDescription("");
    setStatus(false);
    setExpanded(false);

    onCancel();
  };

  // onStart
  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setExpanded(true);
    } else {
      setId("");
      setTitle("");
      setDescription("");
      setStatus(false);
      setExpanded(false);
    }
  }, [task]);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        onClick={() => setExpanded(true)}
        className="task-input"
      />
      {expanded && (
        <>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="task-textarea"
          ></textarea>
          <button type="submit" className="task-btn submit-btn">
            {task ? "Update" : "Add"} Task
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="task-btn cancel-btn"
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
};

export default TaskForm;

import { useState, FormEvent } from "react";
import './index.css';

interface TaskFormProps {
  onAddTask: (task: {
    title: string;
    category: string;
    dueDate: string;
  }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    category: "",
    dueDate: "",
  });

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (!newTask.title) return;

    if (!newTask.category) {
      newTask.category = "uncategorized";
    }

    if (!newTask.dueDate) {
      newTask.dueDate = new Date().toISOString().split("T")[0];
    }

    onAddTask({
      title: newTask.title,
      category: newTask.category,
      dueDate: newTask.dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task title"
        className="title-input"
      />
      <select
        name="category"
        id="category"
        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        className="category-input"
      >
        <option value=""> --- Choose a category </option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Workouts">Workouts</option>
          <option value="Projects">Projects</option>
          <option value="Leisure">Leisure</option>
      </select>
      <div className="flex-row-container">
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          placeholder="Task title"
          className="date-input"
        />
        <button type="submit" className="add-task">New Task</button>
      </div>
    </form>
  );
};

export default TaskForm;

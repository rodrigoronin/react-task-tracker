import { useState, FormEvent } from "react";

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
    if (!newTask.title || !newTask.category || !newTask.dueDate) return;

    onAddTask({
      title: newTask.title,
      category: newTask.category,
      dueDate: newTask.dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task title"
      />
      <select
        name="category"
        id="category"
        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
      >
        <option value="">--- Choose a category ---</option>
        <option value="learning">Learning</option>
        <option value="project">Project</option>
      </select>
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        placeholder="Task title"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;

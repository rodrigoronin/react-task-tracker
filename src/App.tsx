import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import "./App.css";

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string; // ISO 8601 international standard
  complete: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
   const savedTasks: [] = JSON.parse(localStorage.getItem('tasks') || '[]');

   return Array.isArray(savedTasks) ? savedTasks : [];
  });
  const [categoryFilter, setCategoryFilter] = useState("");

  const addTask = (task: {
    title: string;
    category: string;
    dueDate: string;
  }): void => {
    const newTask: Task = {
      ...task,
      id: new Date().getTime().toString(),
      complete: false,
    };

    if (tasks.length && tasks.find((task) => task.title === newTask.title)) {
      throw new Error("Task already exists");
    }

    setTasks((prevTasks) => {
      const updatedTasks: Task[] = [...prevTasks, newTask];
      
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  const getTasksList = (): Task[] => {
    if (!tasks.length) return [];

    if (!categoryFilter) return tasks;

    return tasks.filter((task) => task.category === categoryFilter);
  };

  const toggleTaskCompletion = (id: string): void => {
    const taskToToggle: Task = tasks.find((task) => task.id === id) as Task;

    if (!taskToToggle) return;

    taskToToggle.complete = !taskToToggle.complete;

    setTasks([...tasks]);
  };

  const getCompletedTasks = (): number => {
    if (!tasks.length) return 0;

    return tasks.filter((task) => task.complete === true).length ?? [];
  };

  useEffect(() => {
    const savedTasks: string | null = localStorage.getItem('tasks');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <div className="App">
      <h1>Task Tracker</h1>

      <TaskForm onAddTask={addTask} />

      <div className="filter-tasks">
        <span>Filter by category:</span>
        <select
          name="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value=""> --- </option>
          <option value="learning">Learning</option>
          <option value="project">Project</option>
        </select>
        <button
          type="button"
          onClick={() => {
            setCategoryFilter("");
          }}
          className="clear-filter"
        >
          Clear
        </button>
      </div>

      <div className="tasks-container">
        <ProgressBar completed={getCompletedTasks()} total={tasks.length ?? 0} />

        <p>Tasks: {tasks.length}</p>

        <ul className="task-list">
          {getTasksList().map((task) => (
            <li key={task.id} className={`task-item ${task.complete ? "task-complete" : ""}`}>
              <div className="task-details">
                <input
                  type="checkbox"
                  checked={task.complete}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span className="task-title">{task.title}</span>
                <span className="task-category">{task.category}</span>
                <span className="task-due-date">{task.dueDate}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

import { useState } from "react";
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
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Learn React and TypeScript",
      category: "learning",
      dueDate: "2025-12-31",
      complete: false,
    },
    {
      id: "2",
      title: "Build a project",
      category: "project",
      dueDate: "2025-12-31",
      complete: false,
    },
    {
      id: "3",
      title: "Make a game",
      category: "project",
      dueDate: "2025-12-31",
      complete: false,
    },
    {
      id: "4",
      title: "Publish a game",
      category: "learning",
      dueDate: "2025-12-31",
      complete: false,
    },
  ]);
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

    if (tasks.find((task) => task.title === newTask.title)) {
      throw new Error("Task already exists");
    }

    setTasks([...tasks, newTask]);
  };

  const getTasksList = (): Task[] => {
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
    return tasks.filter((task) => task.complete === true).length;
  };

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
        >
          <option value="">--- Choose a category to filter ----</option>
          <option value="learning">Learning</option>
          <option value="project">Project</option>
        </select>
        <button
          onClick={() => {
            setCategoryFilter("");
          }}
        >
          Clear
        </button>
      </div>

      <div className="container">
        <ProgressBar completed={getCompletedTasks()} total={tasks.length} />

        <p>Tasks: {tasks.length}</p>

        <ul className="task-list">
          {getTasksList().map((task) => (
            <li key={task.id} className={task.complete ? "task-complete" : ""}>
              <span>{` ${task.title} - ${task.category}`}</span>

              <input
                type="checkbox"
                onChange={() => toggleTaskCompletion(task.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

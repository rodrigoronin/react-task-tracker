import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import TaskList from "./components/TaskList/TaskList";

import "./App.css";

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

  const deleteTask = (id: string) => {
    if (!tasks.length) return;

    const updatedTasks: Task[] = tasks.filter((task) => task.id !== id);

    setTasks(() => {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  }

  const getTasksList = (): Task[] => {
    if (!tasks.length) return [];

    if (!categoryFilter) return tasks;

    return tasks.filter((task) => task.category === categoryFilter);
  };

  const toggleTaskCompletion = (id: string): void => {
    const taskToToggle: Task[] = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          complete: !task.complete,
        }
      } else {
        return task
      }
    });

    setTasks(() => {
      const updatedTasks: Task[] = [...taskToToggle]

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return updatedTasks;
    });
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
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Workouts">Workouts</option>
          <option value="Projects">Projects</option>
          <option value="Leisure">Leisure</option>
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

        <TaskList getTasksList={getTasksList} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />

      </div>
    </div>
  );
};

export default App;

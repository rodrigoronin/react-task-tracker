import { useState } from "react";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: {
    title: string;
    category: string;
    dueDate: string;
  }) => {
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

  const toggleTaskCompletion = (id: string): void => {
    const taskToToggle: Task = tasks.find((task) => task.id === id) as Task;

    if (!taskToToggle) return;

    taskToToggle.complete = !taskToToggle.complete;

    setTasks([...tasks]);

    console.log(tasks);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskForm onAddTask={addTask} />
      <div className="container">
        <p>Tasks: {tasks.length}</p>
        <ul className="task-list">
          {tasks.map((task) => (
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

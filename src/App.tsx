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

    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskForm onAddTask={addTask} />
      <div className="container">
        <p>Tasks: {tasks.length}</p>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{`${task.title} - ${task.category}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

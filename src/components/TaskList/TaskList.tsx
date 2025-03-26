import './index.css';

type GetTasksList = {
  (): Task[];
}

type ToggleTaskCompletion = {
  (id: string): void;
}

type DeleteTask = {
  (id: string): void;
}

const TaskList = (
    {getTasksList, toggleTaskCompletion, deleteTask}:
    {getTasksList: GetTasksList, toggleTaskCompletion: ToggleTaskCompletion, deleteTask: DeleteTask}
  ) => {
  return (
    <ul className="task-list">
      <span>{`> Learning`}</span>
      {getTasksList().filter((task) => task.category === 'learning').map((task) => (
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
            <button type="button" onClick={() => deleteTask(task.id)} className="delete-task">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList;

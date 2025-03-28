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
    {tasks, toggleTaskCompletion, deleteTask}:
    {tasks: GetTasksList, toggleTaskCompletion: ToggleTaskCompletion, deleteTask: DeleteTask}
  ) => {

  const categoriesSet = new Set(tasks().map((task: Task) => task.category));
  const uniqueCategories = Array.from(categoriesSet);

  return (
    <>
      {uniqueCategories.map((category: string) => (
        <>
          <span>{`- ${category}`}</span>

          <ul className="task-list">
            {tasks().filter((task) => task.category === category).map((task) => (
              <>
                <li key={task.id} className={`task-item ${task.complete ? "task-complete" : ""}`}>
                  <div className="task-details">
                    <input
                      type="checkbox"
                      checked={task.complete}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span className="task-title">{task.title}</span>
                    <span className="task-due-date">{task.dueDate}</span>
                    <button type="button" onClick={() => deleteTask(task.id)} className="delete-task">
                      Delete
                    </button>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </>
      ))}
    </>
  )
}

export default TaskList;



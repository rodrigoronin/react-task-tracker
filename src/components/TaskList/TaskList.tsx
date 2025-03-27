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

  const categoriesList: string[] = ['Study', 'Work', 'Workouts', 'Projects', 'Leisure'];

  const categoriesSet = new Set(getTasksList().map((task) => task.category));
  const uniqueCategories = Array.from(categoriesSet);

  return (
    <>
      {categoriesList.map((category) => (
        <>
          <span>{`- ${category}`}</span>

          <ul className="task-list">
            {getTasksList().filter((task) => task.category === category).map((task) => (
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



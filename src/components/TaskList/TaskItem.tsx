export const TaskItem = ({
  task,
  onDeleteTask,
  onToggleCompletion
}: {
  task: Task,
  onDeleteTask: DeleteTask,
  onToggleCompletion: ToggleTaskCompletion
}) => {

  return (
    <li className={`task-item ${task.complete ? "task-complete" : ""}`}>
      <div className="task-details">
        <input
          type="checkbox"
          checked={task.complete}
          onChange={() => onToggleCompletion(task.id)}
        />

        <span className="task-title">{task.title}</span>

        <span className="task-due-date">{task.dueDate}</span>

        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          className="delete-task"
          aria-label={`Delete task ${task.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

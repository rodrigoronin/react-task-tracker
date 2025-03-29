import { useMemo } from 'react';
import { TaskItem } from './TaskItem';
import './index.css';


const TaskList = (
    {tasks, toggleTaskCompletion, deleteTask}:
    {tasks: GetTasksList, toggleTaskCompletion: ToggleTaskCompletion, deleteTask: DeleteTask}
  ) => {

  const tasksList: Task[] = useMemo(() => tasks(), [tasks]);

  const getUniqueCategories = useMemo(() => (): string[] => {
    const categoriesSet = new Set(tasks().map((task: Task) => task.category));
    const uniqueCategories = Array.from(categoriesSet);

    return uniqueCategories;
  }, [tasks]);

  const getTasksByCategory = (category: string): Task[] => {
    return tasksList.filter((task) => task.category === category);
  }

  return (
    <>
      {getUniqueCategories().map((category: string) => (
        <section key={category}>
          <h3>{`${category}`}</h3>

          <ul className="task-list">
            {getTasksByCategory(category).map((task: Task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onToggleCompletion={toggleTaskCompletion}
              />
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

export default TaskList;



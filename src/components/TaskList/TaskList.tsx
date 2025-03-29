import { useCallback } from 'react';
import { TaskItem } from './TaskItem';
import './index.css';


const TaskList = (
    {tasks, toggleTaskCompletion, deleteTask}:
    {tasks: Task[], toggleTaskCompletion: ToggleTaskCompletion, deleteTask: DeleteTask}
  ) => {

  const getUniqueCategories = useCallback((): string[] => {
    const categoriesSet = new Set(tasks.map((task: Task) => task.category));
    const uniqueCategories = Array.from(categoriesSet);

    return uniqueCategories;
  }, [tasks]);

  const getTasksByCategory = (category: string): Task[] => {
    return tasks.filter((task) => task.category === category);
  }

  const renderGroupByCategory = (category: string) => {
    return (
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
    );
  }

  return (
    <>
      {getUniqueCategories().map((category: string) => (
        renderGroupByCategory(category)
      ))}
    </>
  )
}

export default TaskList;



declare interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string; // ISO 8601 international standard
  complete: boolean;
}

declare type GetTasksList = {
  (): Task[];
}

declare type ToggleTaskCompletion = {
  (id: string): void;
}

declare type DeleteTask = {
  (id: string): void;
}

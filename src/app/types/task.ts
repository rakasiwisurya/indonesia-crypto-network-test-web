export type TTask = {
  key?: string;
  id: string;
  task_name: string;
  task_desc: number;
  due_date: string;
  status: string;
};

export type TTaskState = {
  tasks: TTask[];
  isTasksLoading: boolean;
  tasksSuccess: any;
  tasksError: any;

  task: TTask | null;
  isTaskLoading: boolean;
  taskSuccess: any;
  taskError: any;

  isTaskAddLoading: boolean;
  taskAddSuccess: any;
  taskAddError: any;

  isTaskUpdateLoading: boolean;
  taskUpdateSuccess: any;
  taskUpdateError: any;

  isTaskDeleteLoading: boolean;
  taskDeleteSuccess: any;
  taskDeleteError: any;
};

export type TTaskAdd = {
  id: string;
  task_name: string;
  task_desc: number;
  due_date: string;
  status: string;
};

export type TTaskEdit = {
  id?: string;
  task_name?: string;
  task_desc?: number;
  due_date?: string;
  status?: string;
};

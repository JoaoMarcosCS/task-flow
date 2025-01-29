import { GetTaskByUserIdHandler } from './get-task-by-user-id/get-task-by-user-id.handler';
import { GetTasksByTitleHandler } from './get-tasks-by-title/get-tasks-by-title.handler';
import { GetTasksByUserIdHandler } from './get-tasks-by-user-id/get-tasks-by-user-id.handler';

export const queryHandlers = [
  GetTasksByUserIdHandler,
  GetTaskByUserIdHandler,
  GetTasksByTitleHandler,
];

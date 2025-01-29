import { AssignResponsibleHandler } from './assign-responsible/assign-responsible.handler';
import { CreateTaskHandler } from './create-task/create-task.handler';
import { DeleteResponsibleHandler } from './delete-responsible/delete-responsible.handler';
import { DeleteTaskHandler } from './delete-task/delete-task.handler';
import { UpdateTaskHandler } from './update-task/update-task.handler';

export const commandHandlers = [
  CreateTaskHandler,
  AssignResponsibleHandler,
  DeleteResponsibleHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
];

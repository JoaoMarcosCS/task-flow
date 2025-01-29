import { Task } from '../../entities/task.entity';

export class GetTasksByTitleDto {
  tasks: Task[] | [];
}

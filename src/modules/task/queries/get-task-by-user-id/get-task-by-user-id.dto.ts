import { Task } from '../../entities/task.entity';

export class GetTaskByUserIdDto {
  task: Task | null;
}

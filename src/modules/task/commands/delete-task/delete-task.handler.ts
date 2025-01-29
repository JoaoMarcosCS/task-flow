import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './delete-task.command';
import { DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler
  implements ICommandHandler<DeleteTaskCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: DeleteTaskCommand): Promise<boolean> {
    const result = await this.dataSource.manager.delete(Task, {
      id: command.taskId,
    });

    if (result.affected === 0) return false;

    return true;
  }
}

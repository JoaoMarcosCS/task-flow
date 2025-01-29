import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { CreateTaskCommand } from './create-task.command';
import { Status } from '../../entities/status.entity';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler
  implements ICommandHandler<CreateTaskCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: CreateTaskCommand): Promise<boolean> {
    return await this.dataSource.transaction(async (db) => {
      const statusDefault = await db.findOne(Status, {
        where: {
          description: 'Em andamento',
        },
      });

      if (!statusDefault) return false;

      const newTask = db.create(Task, {
        ...command,
        board: { id: command.boardId },
        status: statusDefault,
        priority: { id: command.priorityId },
      });

      const result = await db.save(Task, newTask);

      if (!result) return false;

      return true;
    });
  }
}

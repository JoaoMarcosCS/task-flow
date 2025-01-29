import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './update-task.command';
import { DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { Priority } from '../../entities/priority.entity';
import { Status } from '../../entities/status.entity';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler
  implements ICommandHandler<UpdateTaskCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: UpdateTaskCommand): Promise<boolean> {
    const updateData: Partial<Task> = {};

    if (command.title) updateData.title = command.title;
    if (command.description) updateData.description = command.description;

    if (command.priorityId) {
      const priority = await this.dataSource.manager.findOne(Priority, {
        where: { id: command.priorityId },
      });

      updateData.priority = priority!;
    }

    if (command.statusId) {
      const status = await this.dataSource.manager.findOne(Status, {
        where: { id: command.statusId },
      });

      updateData.status = status!;
    }

    const result = await this.dataSource.manager.update(
      Task,
      { id: command.taskId },
      updateData,
    );

    if (result.affected === 0) return false;

    return true;
  }
}

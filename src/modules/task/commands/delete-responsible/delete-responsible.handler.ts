import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { DeleteResponsibleCommand } from './delete-responsible.command';

@CommandHandler(DeleteResponsibleCommand)
export class DeleteResponsibleHandler
  implements ICommandHandler<DeleteResponsibleCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: DeleteResponsibleCommand): Promise<boolean> {
    const task = await this.dataSource.manager.findOne(Task, {
      where: {
        id: command.taskId,
      },
      relations: ['assignees'],
    });

    if (!task) return false;

    task.assignees = task.assignees?.filter(
      (responsible) => responsible.id !== command.userId,
    );

    await this.dataSource.manager.save(Task, task);

    return true;
  }
}

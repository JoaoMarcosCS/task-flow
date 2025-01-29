import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignResponsibleCommand } from './assign-responsible.command';
import { DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BoardUserRole } from 'src/modules/board/entities/board_user_role.entity';

@CommandHandler(AssignResponsibleCommand)
export class AssignResponsibleHandler
  implements ICommandHandler<AssignResponsibleCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: AssignResponsibleCommand): Promise<boolean> {
    const newResponsible = await this.dataSource.manager.findOne(
      BoardUserRole,
      {
        where: {
          userId: command.userId,
          boardId: command.boardId,
        },
      },
    );

    if (!newResponsible) return false;

    const user = await this.dataSource.manager.findOne(User, {
      where: {
        id: command.userId,
      },
    });

    const task = await this.dataSource.manager.findOne(Task, {
      where: {
        id: command.taskId,
      },

      relations: ['assignees'],
    });

    if (!task) return false;

    task.assignees.push(user!);

    await this.dataSource.manager.save(task);

    return true;
  }
}

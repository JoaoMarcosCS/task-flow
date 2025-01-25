import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: UpdateUserCommand): Promise<boolean> {
    const result = await this.dataSource.manager.update(
      User,
      {
        id: command.id,
      },
      {
        ...command,
      },
    );

    if (result.affected === 0) return false;

    return true;
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements ICommandHandler<DeleteUserCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(data: DeleteUserCommand): Promise<boolean> {
    const result = await this.dataSource.manager.delete(User, {
      id: data.id,
    });

    if (result.affected === 0) return false;

    return true;
  }
}

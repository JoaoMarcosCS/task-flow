import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: CreateUserCommand): Promise<boolean> {
    const data = this.dataSource.manager.create(User, {
      ...command,
    });

    const result = await this.dataSource.manager.save(data);

    if (!result) return false;

    return true;
  }
}

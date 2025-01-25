import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { generateHash } from 'src/utils/generate-hash';
import { CreateUserDto } from './create-user.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(data: CreateUserDto): Promise<boolean> {
    const hash = await generateHash(data.password);

    const user = this.dataSource.manager.create(User, {
      ...data,
      password: hash,
    });

    const result = await this.dataSource.manager.save(user);

    if (!result) return false;

    return true;
  }
}

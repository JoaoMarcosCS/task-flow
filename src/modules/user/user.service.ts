import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { plainToClass } from 'class-transformer';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './queries/get-user-by-email/get-user-by-email.query';
import { GetUserByEmailDto } from './queries/get-user-by-email/get-user-by-email.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(data: CreateUserDto) {
    const query = plainToClass(GetUserByEmailQuery, { email: data.email });

    const user = await this.queryBus.execute<
      GetUserByEmailQuery,
      GetUserByEmailDto
    >(query);

    if (user != null) return new BadRequestException('Email em uso');

    const command = plainToClass(CreateUserCommand, data);

    const result = await this.commandBus.execute<CreateUserCommand, boolean>(
      command,
    );

    if (!result) return new BadRequestException('Erro ao criar usuário');

    return result;
  }
}

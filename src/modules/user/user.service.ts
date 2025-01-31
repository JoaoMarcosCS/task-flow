import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { plainToClass } from 'class-transformer';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './queries/get-user-by-email/get-user-by-email.query';
import { GetUserByEmailDto } from './queries/get-user-by-email/get-user-by-email.dto';
import { UpdateUserDto } from './commands/update-user/update-user.dto';
import { GetUserByIdQuery } from './queries/get-user-by-id/get-user-by-id.query';
import { GetUserByIdDto } from './queries/get-user-by-id/get-user-by-id.dto';
import { UpdateUserCommand } from './commands/update-user/update-user.command';
import { DeleteUserCommand } from './commands/delete-user/delete-user.command';
@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getUserById(data: number) {
    const query = plainToClass(GetUserByIdQuery, { id: data });

    const result = await this.queryBus.execute<
      GetUserByIdQuery,
      GetUserByIdDto | null
    >(query);

    return result;
  }

  async getUserByEmail(email: string) {
    const query = plainToClass(GetUserByEmailQuery, { email });

    const result = await this.queryBus.execute<
      GetUserByEmailQuery,
      GetUserByEmailDto | null
    >(query);

    return result;
  }

  async create(data: CreateUserDto) {
    const query = plainToClass(GetUserByEmailQuery, { email: data.email });

    const user = await this.queryBus.execute<
      GetUserByEmailQuery,
      GetUserByEmailDto
    >(query);

    if (user != null) throw new BadRequestException('Email em uso');

    const command = plainToClass(CreateUserCommand, data);

    const result = await this.commandBus.execute<CreateUserCommand, boolean>(
      command,
    );

    if (!result) return new BadRequestException('Erro ao criar usuário');

    return { ok: result };
  }

  async update(data: UpdateUserDto) {
    const query = plainToClass(GetUserByIdQuery, { id: data.id });

    const user = await this.queryBus.execute<GetUserByIdQuery, GetUserByIdDto>(
      query,
    );

    if (!user) throw new BadRequestException('Usuário não encontrado');

    const command = plainToClass(UpdateUserCommand, data);

    const result = await this.commandBus.execute<
      UpdateUserCommand,
      UpdateUserDto
    >(command);

    return { ok: result };
  }

  async delete(data: number) {
    const query = plainToClass(GetUserByIdQuery, data);

    const user = await this.queryBus.execute<GetUserByIdQuery, GetUserByIdDto>(
      query,
    );

    if (!user) throw new BadRequestException('Usuário não encontrado');

    const command = plainToClass(DeleteUserCommand, data);

    const result = await this.commandBus.execute<DeleteUserCommand, boolean>(
      command,
    );

    return { ok: result };
  }
}

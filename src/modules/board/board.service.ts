import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBoardDto } from './commands/create-board/create-board.dto';
import { plainToClass } from 'class-transformer';
import { CreateBoardCommand } from './commands/create-board/create-board.command';
import { GetBoardsByUserIdDto } from './queries/get-boards-by-user-id/get-boards-by-user-id.dto';
import { GetBoardsByUserIdQuery } from './queries/get-boards-by-user-id/get-boards-by-user-id.query';
import { GetBoardByUserIdDto } from './queries/get-board-by-user-id/get-board-by-user-id.dto';
import { GetBoardByUserIdQuery } from './queries/get-board-by-user-id/get-board-by-user-id.query';

@Injectable()
export class BoardService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(data: CreateBoardDto) {
    const command = plainToClass(CreateBoardCommand, data);

    const result = await this.commandBus.execute<CreateBoardCommand, boolean>(
      command,
    );

    if (!result) throw new BadRequestException('Erro ao criar a board');

    return { ok: result };
  }

  async getBoardsByUserId(data: number) {
    const query = plainToClass(GetBoardsByUserIdQuery, data);

    return await this.queryBus.execute<
      GetBoardsByUserIdQuery,
      GetBoardsByUserIdDto
    >(query);
  }

  async getBoardByUserId(data: GetBoardByUserIdQuery) {
    const query = plainToClass(GetBoardByUserIdQuery, { data });

    return await this.queryBus.execute<
      GetBoardByUserIdQuery,
      GetBoardByUserIdDto
    >(query);
  }
}

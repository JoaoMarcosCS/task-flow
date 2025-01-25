import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBoardDto } from './commands/create-board/create-board.dto';
import { plainToClass } from 'class-transformer';
import { CreateBoardCommand } from './commands/create-board/create-board.command';
import { GetBoardsByUserIdDto } from './queries/get-boards-by-user-id/get-boards-by-user-id.dto';
import { GetBoardsByUserIdQuery } from './queries/get-boards-by-user-id/get-boards-by-user-id.query';
import { GetBoardByUserIdDto } from './queries/get-board-by-user-id/get-board-by-user-id.dto';
import { GetBoardByUserIdQuery } from './queries/get-board-by-user-id/get-board-by-user-id.query';
import { UpdateBoardCommand } from './commands/update-board/update-board.command';
import { UpdateBoardDto } from './commands/update-board/update-board.dto';
import { DeleteBoardCommand } from './commands/delete-board/delete-board.command';

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
    const query = plainToClass(GetBoardByUserIdQuery, data);

    return await this.queryBus.execute<
      GetBoardByUserIdQuery,
      GetBoardByUserIdDto
    >(query);
  }

  async update(boardId: number, data: UpdateBoardDto) {
    const command = plainToClass(UpdateBoardCommand, { ...data, id: boardId });

    const result = await this.commandBus.execute<UpdateBoardCommand, boolean>(
      command,
    );

    if (!result) throw new BadRequestException('Erro ao editar a board');

    return { ok: result };
  }

  async delete(boardId: number) {
    console.log(boardId);
    const command = plainToClass(DeleteBoardCommand, { id: boardId });
    const result = await this.commandBus.execute<DeleteBoardCommand, boolean>(
      command,
    );
    if (!result) throw new BadRequestException('Erro ao deletar a board');
    return { ok: result };
  }
}

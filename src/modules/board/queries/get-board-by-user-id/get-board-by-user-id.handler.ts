import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBoardByUserIdDto } from './get-board-by-user-id.dto';
import { GetBoardByUserIdQuery } from './get-board-by-user-id.query';
import { DataSource } from 'typeorm';
import { Board } from '../../entities/board.entity';
import { BoardUserRole } from '../../entities/board_user_role.entity';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(GetBoardByUserIdQuery)
export class GetBoardByUserIdHandler
  implements IQueryHandler<GetBoardByUserIdQuery, GetBoardByUserIdDto>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetBoardByUserIdQuery): Promise<GetBoardByUserIdDto> {
    const { userId, boardId } = query;

    console.log(
      `${typeof userId} - ${JSON.stringify(userId)}, ${typeof boardId} - ${boardId}`,
    );
    const board_user_role = await this.dataSource.manager.findOne(
      BoardUserRole,
      {
        where: {
          userId,
          boardId,
        },
        relations: ['role'],
        select: {
          role: {
            description: true,
          },
          boardId: false,
          userId: false,
          id: false,
        },
      },
    );

    if (!board_user_role)
      throw new UnauthorizedException(
        'Usuário não autorizado para esse board de tarefas',
      );

    const board = await this.dataSource.manager.findOne(Board, {
      where: {
        id: query.boardId,
        members: {
          id: query.userId,
        },
      },
      relations: ['members', 'tasks'],
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
        update_at: true,
        tasks: {
          assignees: {
            name: true,
            email: true,
            created_at: true,
            update_at: true,
          },
          priority: {
            description: true,
          },
          status: {
            description: true,
          },
        },
        members: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return {
      board,
      total_members: board?.members.length ?? 0,
      total_tasks: board?.tasks?.length ?? 0,
      board_user_role,
    };
  }
}

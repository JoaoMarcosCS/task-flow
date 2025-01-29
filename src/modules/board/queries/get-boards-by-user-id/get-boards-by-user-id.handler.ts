import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBoardsByUserIdQuery } from './get-boards-by-user-id.query';
import { GetBoardsByUserIdDto } from './get-boards-by-user-id.dto';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@QueryHandler(GetBoardsByUserIdQuery)
export class GetBoardsByUserIdHandler
  implements IQueryHandler<GetBoardsByUserIdQuery, GetBoardsByUserIdDto[]>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(
    query: GetBoardsByUserIdQuery,
  ): Promise<GetBoardsByUserIdDto[]> {
    const user = await this.dataSource.manager.findOne(User, {
      where: {
        id: query.userId,
      },
      relations: ['boards', 'boards.tasks', 'boards.members'],
      select: {
        boards: {
          id: true,
          description: true,
          title: true,
          members: true,
          tasks: true,
          update_at: true,
          created_at: true,
        },
      },
      order: {
        boards: {
          update_at: 'desc',
        },
      },
    });

    if (!user?.boards) return [];

    const boards = user.boards.map((board) => {
      const boardDto = new GetBoardsByUserIdDto();
      boardDto.id = board.id;
      boardDto.title = board.title;
      boardDto.description = board.description;
      boardDto.total_members = board.members.length ?? 0;
      boardDto.total_tasks = board.tasks?.length ?? 0;
      boardDto.created_at = board.created_at;
      boardDto.updated_at = board.update_at;
      return boardDto;
    });

    return boards;
  }
}

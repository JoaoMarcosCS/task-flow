import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBoardsByUserIdQuery } from './get-boards-by-user-id.query';
import { GetBoardsByUserIdDto } from './get-boards-by-user-id.dto';
import { DataSource } from 'typeorm';
import { Board } from '../../entities/board.entity';

@QueryHandler(GetBoardsByUserIdQuery)
export class GetBoardsByUserIdHandler
  implements IQueryHandler<GetBoardsByUserIdQuery, GetBoardsByUserIdDto>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetBoardsByUserIdQuery): Promise<GetBoardsByUserIdDto> {
    const boards = await this.dataSource
      .createQueryBuilder(Board, 'board')
      .leftJoinAndSelect('board.members', 'user')
      .leftJoinAndSelect('board.tasks', 'task')
      .where('user.id = :userId', { userId: query.userId })
      .select([
        'board.id',
        'board.title',
        'board.description',
        'board.created_at',
        'board.update_at',
        'COUNT( DISTINCT user.id) AS total_members',
        'COUNT( DISTINCT task.id) AS total_tasks',
      ])
      .orderBy('board.update_at', 'DESC')
      .groupBy('board.id')
      .getRawMany();

    return { boards };
  }
}

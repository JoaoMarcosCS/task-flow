import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource, Like } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { GetTasksByTitleDto } from './get-tasks-by-title.dto';
import { GetTasksByTitleQuery } from './get-tasks-by-title.query';

@QueryHandler(GetTasksByTitleQuery)
export class GetTasksByTitleHandler
  implements IQueryHandler<GetTasksByTitleQuery, GetTasksByTitleDto>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetTasksByTitleQuery): Promise<GetTasksByTitleDto> {
    const tasks = await this.dataSource.manager.find(Task, {
      where: {
        title: Like(`%${query.title}%`),
        board: {
          id: query.boardId,
        },
      },
      relations: ['assignees', 'priority', 'status', 'board'],
      select: {
        assignees: {
          name: true,
          email: true,
        },
        board: {
          title: true,
        },
        priority: {
          description: true,
        },
        status: {
          description: true,
        },
      },
    });

    return { tasks };
  }
}

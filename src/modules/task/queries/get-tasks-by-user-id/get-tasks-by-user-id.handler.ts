import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTasksByUserIdQuery } from './get-tasks-by-user-id.query';
import { GetTasksByUserIdDto } from './get-tasks-by-user-id.dto';
import { DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';

@QueryHandler(GetTasksByUserIdQuery)
export class GetTasksByUserIdHandler
  implements IQueryHandler<GetTasksByUserIdQuery, GetTasksByUserIdDto>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetTasksByUserIdQuery): Promise<GetTasksByUserIdDto> {
    const tasks = await this.dataSource.manager.find(Task, {
      where: {
        assignees: {
          id: query.userId,
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
          id: true,
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

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaskByUserIdQuery } from './get-task-by-user-id.query';
import { GetTaskByUserIdDto } from './get-task-by-user-id.dto';
import { DataSource } from 'typeorm';
import { Task } from '../../entities/task.entity';

@QueryHandler(GetTaskByUserIdQuery)
export class GetTaskByUserIdHandler
  implements IQueryHandler<GetTaskByUserIdQuery, GetTaskByUserIdDto>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetTaskByUserIdQuery): Promise<GetTaskByUserIdDto> {
    const task = await this.dataSource.manager.findOne(Task, {
      where: {
        id: query.taskId,
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
        },
        priority: {
          description: true,
        },
        status: {
          description: true,
        },
      },
    });

    return { task };
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task/create-task.command';
import { CreateTaskDto } from './commands/create-task/create-task.dto';
import { plainToClass } from 'class-transformer';
import { GetTasksByUserIdQuery } from './queries/get-tasks-by-user-id/get-tasks-by-user-id.query';
import { GetTasksByUserIdDto } from './queries/get-tasks-by-user-id/get-tasks-by-user-id.dto';
import { GetTaskByUserIdQuery } from './queries/get-task-by-user-id/get-task-by-user-id.query';
import { GetTaskByUserIdDto } from './queries/get-task-by-user-id/get-task-by-user-id.dto';
import { AssignResponsibleCommand } from './commands/assign-responsible/assign-responsible.command';
import { DataSource } from 'typeorm';
import { Priority } from './entities/priority.entity';
import { Status } from './entities/status.entity';
import { DeleteResponsibleCommand } from './commands/delete-responsible/delete-responsible.command';
import { UpdateTaskCommand } from './commands/update-task/update-task.command';
import { DeleteTaskCommand } from './commands/delete-task/delete-task.command';

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly dataSource: DataSource,
  ) {}

  async create(data: CreateTaskDto) {
    const command = plainToClass(CreateTaskCommand, data);

    const result = await this.commandBus.execute<CreateTaskCommand, boolean>(
      command,
    );

    if (!result) throw new BadRequestException('Erro ao criar a tarefa');

    return { ok: result };
  }

  async getTasksByUserId(userId: number) {
    const query = plainToClass(GetTasksByUserIdQuery, userId);

    return this.queryBus.execute<GetTasksByUserIdQuery, GetTasksByUserIdDto>(
      query,
    );
  }

  async getTaskByUserId(data: GetTaskByUserIdQuery) {
    const query = plainToClass(GetTaskByUserIdQuery, data);

    return this.queryBus.execute<GetTaskByUserIdQuery, GetTaskByUserIdDto>(
      query,
    );
  }

  async assignResponsible(data: AssignResponsibleCommand) {
    const command = plainToClass(AssignResponsibleCommand, data);

    const result = await this.commandBus.execute<
      AssignResponsibleCommand,
      boolean
    >(command);

    if (!result) throw new BadRequestException('Erro ao adicionar responsável');

    return { ok: result };
  }

  async deleteResponsible(data: DeleteResponsibleCommand) {
    const command = plainToClass(DeleteResponsibleCommand, data);

    const result = await this.commandBus.execute<
      DeleteResponsibleCommand,
      boolean
    >(command);

    if (!result) throw new BadRequestException('Erro ao remover responsável');

    return { ok: result };
  }

  async getPriorities() {
    return await this.dataSource.manager.find(Priority, {
      select: {
        description: true,
        id: true,
      },
    });
  }

  async getStatus() {
    return await this.dataSource.manager.find(Status, {
      select: {
        description: true,
        id: true,
      },
    });
  }

  async update(taskId: number, data) {
    const command = plainToClass(UpdateTaskCommand, { ...data, taskId });

    const result = await this.commandBus.execute<UpdateTaskCommand, boolean>(
      command,
    );

    if (!result) throw new BadRequestException('Erro ao alterar a tarefa');

    return { ok: result };
  }

  async delete(taskId: number, boardId: number) {
    const command = plainToClass(DeleteTaskCommand, { boardId, taskId });

    const result = await this.commandBus.execute<DeleteTaskCommand, boolean>(
      command,
    );

    if (!result) throw new BadRequestException('Erro ao deletar a tarefa');

    return { ok: result };
  }
}

import { AdminBoardGuard } from '../auth/guard/admin-board.guard';
import { CreateTaskDto } from './commands/create-task/create-task.dto';
import { TaskService } from './task.service';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { GetTaskByUserIdQuery } from './queries/get-task-by-user-id/get-task-by-user-id.query';
import { AssignResponsibleCommand } from './commands/assign-responsible/assign-responsible.command';
import { DeleteResponsibleCommand } from './commands/delete-responsible/delete-responsible.command';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateTaskDto } from './commands/update-task/update-task.dto';
import { DeleteTaskDto } from './commands/delete-task/delete-task.dto';
import { GetTasksByUserIdDto } from './queries/get-tasks-by-user-id/get-tasks-by-user-id.dto';
import { Priority } from './entities/priority.entity';
import { Status } from './entities/status.entity';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 403, description: 'Usuário sem permissão.' })
  @ApiResponse({ status: 200, description: 'Tarefa criada.', type: Boolean })
  @UseGuards(AdminBoardGuard)
  async create(@Body() body: CreateTaskDto) {
    return await this.taskService.create(body);
  }

  @Get('get-tasks/:userId')
  @ApiOperation({ summary: 'Obtém todas as tarefas de um usuário' })
  @ApiParam({ name: 'userId', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de tarefas do usuário.' })
  async getTasksByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.taskService.getTasksByUserId(userId);
  }

  @Get('get-tasks/:userId/:taskId')
  @ApiOperation({ summary: 'Obtém uma tarefa específica de um usuário' })
  @ApiParam({ name: 'userId', required: true, type: Number })
  @ApiParam({ name: 'taskId', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada.',
    type: GetTasksByUserIdDto,
  })
  async getTaskByUserId(@Param() params: GetTaskByUserIdQuery) {
    return await this.taskService.getTaskByUserId(params);
  }

  @Post('assign-responsible')
  @ApiOperation({ summary: 'Atribui um responsável a uma tarefa' })
  @ApiBody({ type: AssignResponsibleCommand })
  @ApiResponse({
    status: 201,
    description: 'Responsável atribuído.',
    type: Boolean,
  })
  @UseGuards(AdminBoardGuard)
  async assignResponsible(@Body() body: AssignResponsibleCommand) {
    return await this.taskService.assignResponsible(body);
  }

  @Post('delete-responsible')
  @ApiOperation({ summary: 'Remove um responsável de uma tarefa' })
  @ApiBody({ type: DeleteResponsibleCommand })
  @ApiResponse({
    status: 200,
    description: 'Responsável removido.',
    type: Boolean,
  })
  @UseGuards(AdminBoardGuard)
  async deleteResponsible(@Body() body: DeleteResponsibleCommand) {
    return await this.taskService.deleteResponsible(body);
  }

  @Get('priorities')
  @ApiOperation({ summary: 'Obtém a lista de prioridades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de prioridades retornada.',
    type: Array<Priority>,
  })
  async getPriorities() {
    return await this.taskService.getPriorities();
  }

  @Get('status')
  @ApiOperation({ summary: 'Obtém a lista de status' })
  @ApiResponse({
    status: 200,
    description: 'Lista de status retornada.',
    type: Array<Status>,
  })
  async getStatus() {
    return await this.taskService.getStatus();
  }

  @Patch(':taskId')
  @ApiOperation({ summary: 'Atualiza uma tarefa' })
  @ApiParam({ name: 'taskId', required: true, type: Number })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso.',
    type: Boolean,
  })
  @ApiResponse({ status: 403, description: 'Usuário sem permissão.' })
  @UseGuards(AdminBoardGuard)
  async update(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() body: UpdateTaskDto,
  ) {
    return await this.taskService.update(taskId, body);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Exclui uma tarefa' })
  @ApiParam({ name: 'taskId', required: true, type: Number })
  @ApiBody({ type: DeleteTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Tarefa excluída com sucesso.',
    type: Boolean,
  })
  @ApiResponse({ status: 403, description: 'Usuário sem permissão.' })
  @UseGuards(AdminBoardGuard)
  async delete(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() body: DeleteTaskDto,
  ) {
    return await this.taskService.delete(taskId, body.boardId);
  }
}

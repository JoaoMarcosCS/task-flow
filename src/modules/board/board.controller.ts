import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBoardDto } from './commands/create-board/create-board.dto';
import { BoardService } from './board.service';
import { AdminBoardGuard } from '../auth/guard/admin-board.guard';
import { UpdateBoardDto } from './commands/update-board/update-board.dto';
import { GetBoardByUserIdQuery } from './queries/get-board-by-user-id/get-board-by-user-id.query';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GetBoardsByUserIdDto } from './queries/get-boards-by-user-id/get-boards-by-user-id.dto';
import { GetBoardByUserIdDto } from './queries/get-board-by-user-id/get-board-by-user-id.dto';
import { Role } from './entities/role.entity';

@ApiTags('Boards')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo board' })
  @ApiBody({ type: CreateBoardDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'Board criado com sucesso',
    type: Boolean,
  })
  async create(@Body() body: CreateBoardDto) {
    return await this.boardService.create(body);
  }

  @Get('get-boards-by-user-id/:userId')
  @ApiOperation({ summary: 'Obtém todos os boards de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de boards retornada com sucesso',
    type: Array<GetBoardsByUserIdDto>,
  })
  async getBoardsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.boardService.getBoardsByUserId(userId);
  }

  @Get('get-board-by-user-id/:userId/:boardId')
  @ApiOperation({ summary: 'Obtém um board específico de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Board retornado com sucesso',
    type: GetBoardByUserIdDto,
  })
  async getBoardByUserId(@Param() params: GetBoardByUserIdQuery) {
    return await this.boardService.getBoardByUserId(params);
  }

  @Patch(':boardId')
  @UseGuards(AdminBoardGuard)
  @ApiOperation({ summary: 'Atualiza um board' })
  @ApiBody({ type: UpdateBoardDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'Board atualizado com sucesso',
    type: Boolean,
  })
  async update(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() body: UpdateBoardDto,
  ) {
    return await this.boardService.update(boardId, body);
  }

  @Delete(':boardId')
  @UseGuards(AdminBoardGuard)
  @ApiOperation({ summary: 'Deleta um board' })
  @ApiResponse({
    status: 200,
    description: 'Board deletado com sucesso',
    type: Boolean,
  })
  async delete(@Param('boardId', ParseIntPipe) boardId: number) {
    return await this.boardService.delete(boardId);
  }

  @Post(':boardId/add-member')
  @UseGuards(AdminBoardGuard)
  @ApiOperation({ summary: 'Adiciona um membro ao board' })
  @ApiBody({ schema: { example: { userId: 1, roleId: 2 } } })
  @ApiResponse({
    status: 201,
    description: 'Membro adicionado com sucesso',
    type: Boolean,
  })
  async addMember(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() body: { userId: number; roleId: number },
  ) {
    return await this.boardService.addMember(boardId, body.userId, body.roleId);
  }

  @Post(':boardId/delete-member')
  @UseGuards(AdminBoardGuard)
  @ApiOperation({ summary: 'Remove um membro do board' })
  @ApiBody({ schema: { example: { userId: 1 } } })
  @ApiResponse({
    status: 200,
    description: 'Membro removido com sucesso',
    type: Boolean,
  })
  async deleteMember(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() body: { userId: number },
  ) {
    return await this.boardService.deleteMember(boardId, body.userId);
  }

  @Post(':boardId/update-member-role')
  @UseGuards(AdminBoardGuard)
  @ApiOperation({ summary: 'Atualiza a função de um membro no board' })
  @ApiBody({ schema: { example: { userId: 1, roleId: 3 } } })
  @ApiResponse({
    status: 200,
    description: 'Função do membro atualizada com sucesso',
    type: Boolean,
  })
  async updateMemberRole(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() body: { userId: number; roleId: number },
  ) {
    return await this.boardService.updateMemberRole(
      boardId,
      body.userId,
      body.roleId,
    );
  }

  @Get('roles')
  @ApiOperation({ summary: 'Obtém a lista de funções disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de funções retornada com sucesso',
    type: Array<Role>,
  })
  async getRoles() {
    return await this.boardService.getRoles();
  }
}

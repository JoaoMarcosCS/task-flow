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
import { AuthJwtGuard } from '../auth/guard/auth-jwt.guard';
import { AdminBoardGuard } from '../auth/guard/admin-board.guard';
import { UpdateBoardDto } from './commands/update-board/update-board.dto';
import { GetBoardByUserIdQuery } from './queries/get-board-by-user-id/get-board-by-user-id.query';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(AuthJwtGuard)
  async create(
    @Body()
    body: CreateBoardDto,
  ) {
    return await this.boardService.create(body);
  }

  @Get('get-boards-by-user-id/:userId')
  @UseGuards(AuthJwtGuard)
  async getBoardsByUserId(
    @Param()
    userId: number,
  ) {
    return await this.boardService.getBoardsByUserId(userId);
  }

  @Get('get-boards-by-user-id/:userId/:boardId')
  @UseGuards(AuthJwtGuard)
  async getBoardByUserId(
    @Param()
    params: GetBoardByUserIdQuery,
  ) {
    return await this.boardService.getBoardByUserId(params);
  }

  @Patch(':boardId')
  @UseGuards(AuthJwtGuard, AdminBoardGuard)
  async update(
    @Param('boardId', ParseIntPipe)
    boardId: number,
    @Body()
    body: UpdateBoardDto,
  ) {
    return await this.boardService.update(boardId, body);
  }

  @Delete(':boardId')
  @UseGuards(AuthJwtGuard, AdminBoardGuard)
  async delete(
    @Param('boardId', ParseIntPipe)
    boardId: number,
  ) {
    return await this.boardService.delete(boardId);
  }

  @Post(':boardId/add-member')
  @UseGuards(AuthJwtGuard, AdminBoardGuard)
  async addMember(
    @Param('boardId', ParseIntPipe)
    boardId: number,
    @Body()
    body: { userId: number; roleId: number },
  ) {
    return await this.boardService.addMember(boardId, body.userId, body.roleId);
  }
}

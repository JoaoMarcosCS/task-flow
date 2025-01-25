import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateBoardDto } from './commands/create-board/create-board.dto';
import { BoardService } from './board.service';
import { AuthJwtGuard } from '../auth/guard/auth-jwt.guard';

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
    userId: number,
    boardId: number,
  ) {
    return await this.boardService.getBoardByUserId({ userId, boardId });
  }
}

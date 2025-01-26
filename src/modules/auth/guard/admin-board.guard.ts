import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BoardUserRole } from 'src/modules/board/entities/board_user_role.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminBoardGuard implements CanActivate {
  constructor(
    private readonly dataSource: DataSource,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId || request.user.userId;
    const boardId = request.params.boardId || request.body.boardId;

    if (!userId || !boardId) {
      throw new ForbiddenException('Usuário ou board não encontrado.');
    }

    const boardUserRole = await this.dataSource.manager.findOne(BoardUserRole, {
      where: { userId, boardId },
      relations: ['role'],
    });

    if (!boardUserRole || boardUserRole.role.description !== 'administrador') {
      throw new ForbiddenException(
        'Você não tem permissão para alterar essa board.',
      );
    }

    return true;
  }
}

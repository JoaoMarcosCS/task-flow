import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBoardCommand } from './create-board.command';
import { DataSource } from 'typeorm';
import { CreateBoardDto } from './create-board.dto';
import { Board } from '../../entities/board.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { BoardUserRole } from '../../entities/board_user_role.entity';
import { Role } from '../../entities/role.entity';

@CommandHandler(CreateBoardCommand)
export class CreateBoardHandler
  implements ICommandHandler<CreateBoardCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: CreateBoardDto): Promise<boolean> {
    return await this.dataSource.transaction(async (db) => {
      const memberAdmin = await this.dataSource.manager.findOne(User, {
        where: {
          id: command.memberAdminId,
        },
        select: ['id', 'name', 'email'],
      });

      if (!memberAdmin) throw new NotFoundException('Usuário não encontrado');

      const board = this.dataSource.manager.create(Board, {
        ...command,
        members: [memberAdmin],
      });

      const result = await this.dataSource.manager.save(board);

      if (!result) return false;

      let roleAdmin = await this.dataSource.manager.findOne(Role, {
        where: {
          description: 'administrador',
        },
      });

      if (!roleAdmin) {
        roleAdmin = db.create(Role, {
          description: 'administrador',
        });
        await db.save(Role, roleAdmin);
      }

      const newBoardUserRole = new BoardUserRole();

      newBoardUserRole.boardId = result.id;
      newBoardUserRole.userId = memberAdmin.id;
      newBoardUserRole.role = roleAdmin;

      return true;
    });
  }
}

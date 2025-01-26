import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { AddMemberBoardCommand } from './add-member-board.command';
import { Role } from '../../entities/role.entity';
import { Board } from '../../entities/board.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BoardUserRole } from '../../entities/board_user_role.entity';

@CommandHandler(AddMemberBoardCommand)
export class AddMemberBoardHandler
  implements ICommandHandler<AddMemberBoardCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: AddMemberBoardCommand): Promise<boolean> {
    return await this.dataSource.transaction(async (db) => {
      const role = await db.findOne(Role, {
        where: { id: command.roleId },
      });

      if (!role) return false;

      const user = await db.findOne(User, {
        where: { id: command.userId },
      });

      if (!user) return false;

      const board = await db.findOne(Board, {
        where: { id: command.id },
        relations: ['members'],
      });

      if (!board) return false;

      board?.members.push(user);

      await db.save(board);

      try {
        const newBoardUserRole = new BoardUserRole();
        newBoardUserRole.boardId = board.id;
        newBoardUserRole.userId = user.id;
        newBoardUserRole.role = role;

        const boardUserRole = db.create(BoardUserRole, {
          ...newBoardUserRole,
        });

        await db.save(boardUserRole);

        return true;
      } catch (error) {
        if (error.code === '23505') {
          return false;
        } else {
          return false;
        }
      }
    });
  }
}

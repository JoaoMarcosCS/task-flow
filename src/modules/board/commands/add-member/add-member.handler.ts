import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { AddMemberCommand } from './add-member.command';
import { Role } from '../../entities/role.entity';
import { Board } from '../../entities/board.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BoardUserRole } from '../../entities/board_user_role.entity';

@CommandHandler(AddMemberCommand)
export class AddMemberHandler
  implements ICommandHandler<AddMemberCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: AddMemberCommand): Promise<boolean> {
    return await this.dataSource.transaction(async (db) => {
      const role = await db.findOne(Role, {
        where: { id: command.roleId },
      });

      console.log('role add', JSON.stringify(role));
      if (!role) return false;

      const user = await db.findOne(User, {
        where: { id: command.userId },
      });

      console.log('user add', JSON.stringify(user));

      if (!user) return false;

      const board = await db.findOne(Board, {
        where: { id: command.id },
        relations: ['members'],
      });

      console.log('board add', JSON.stringify(board));

      if (!board) return false;

      board?.members.push(user);

      await db.save(board);

      const board1 = await db.findOne(Board, {
        where: { id: command.id },
        relations: ['members'],
      });

      console.log('board add', JSON.stringify(board1));
      const newBoardUserRole = new BoardUserRole();
      newBoardUserRole.boardId = board.id;
      newBoardUserRole.userId = user.id;
      newBoardUserRole.role = role;

      const boardUserRole = db.create(BoardUserRole, {
        ...newBoardUserRole,
      });
      await db.save(boardUserRole);

      console.log('boardroleuser add', JSON.stringify(boardUserRole));

      return true;
    });
  }
}

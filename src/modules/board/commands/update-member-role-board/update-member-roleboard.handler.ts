import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { UpdateMemberRoleBoardCommand } from './update-member-role-board.command';
import { Role } from '../../entities/role.entity';
import { BoardUserRole } from '../../entities/board_user_role.entity';

@CommandHandler(UpdateMemberRoleBoardCommand)
export class UpdateMemberRoleHandler
  implements ICommandHandler<UpdateMemberRoleBoardCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: UpdateMemberRoleBoardCommand): Promise<boolean> {
    return await this.dataSource.transaction(async (db) => {
      const role = await db.findOne(Role, {
        where: { id: command.roleId },
      });

      if (!role) return false;

      const boardUserRole = await db.findOne(BoardUserRole, {
        where: {
          boardId: command.boardId,
          userId: command.userId,
        },
      });

      if (!boardUserRole) return false;

      boardUserRole.role = role;

      await db.save(boardUserRole);

      return true;
    });
  }
}

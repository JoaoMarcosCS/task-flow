import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { DeleteBoardCommand } from './delete-board.command';
import { Board } from '../../entities/board.entity';
import { BoardUserRole } from '../../entities/board_user_role.entity';

@CommandHandler(DeleteBoardCommand)
export class DeleteBoardHandler
  implements ICommandHandler<DeleteBoardCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: DeleteBoardCommand): Promise<boolean> {
    return await this.dataSource.transaction(async (db) => {
      const boardUserRolesDelete = await db.delete(BoardUserRole, {
        boardId: command.id,
      });

      if (boardUserRolesDelete.affected === 0) {
        return false;
      }

      const result = await db.delete(Board, {
        id: command.id,
      });

      if (result.affected === 0) {
        return false;
      }

      return true;
    });
  }
}

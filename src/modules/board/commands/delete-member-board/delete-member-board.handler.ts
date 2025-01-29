import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { Board } from '../../entities/board.entity';
import { BoardUserRole } from '../../entities/board_user_role.entity';
import { DeleteMemberBoardCommand } from './delete-member.command';

@CommandHandler(DeleteMemberBoardCommand)
export class DeleteMemberBoardHandler
  implements ICommandHandler<DeleteMemberBoardCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: DeleteMemberBoardCommand): Promise<boolean> {
    const roleDelete = await this.dataSource.manager.delete(BoardUserRole, {
      userId: command.userId,
      boardId: command.id,
    });

    if (roleDelete.affected == 0) return false;

    const board = await this.dataSource.manager.findOne(Board, {
      where: { id: command.id },
      relations: ['members'],
    });

    if (!board) return false;

    board?.members.filter((member) => member.id !== command.userId);

    await this.dataSource.manager.save(Board, board);

    return true;
  }
}

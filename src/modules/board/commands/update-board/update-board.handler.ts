import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBoardCommand } from './update-board.command';
import { DataSource } from 'typeorm';
import { Board } from '../../entities/board.entity';

@CommandHandler(UpdateBoardCommand)
export class UpdateBoardHandler
  implements ICommandHandler<UpdateBoardCommand, boolean>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: UpdateBoardCommand): Promise<boolean> {
    const result = await this.dataSource.manager.update(
      Board,
      {
        id: command.id,
      },
      { ...command },
    );

    if (result.affected === 0) return false;

    return true;
  }
}

import { Board } from '../../entities/board.entity';

export class GetBoardsByUserIdDto {
  boards: Board[] | null;
}

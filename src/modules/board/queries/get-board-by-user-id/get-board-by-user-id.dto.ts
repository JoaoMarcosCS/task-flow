import { Board } from '../../entities/board.entity';
import { BoardUserRole } from '../../entities/board_user_role.entity';

export class GetBoardByUserIdDto {
  board: Board | null;
  total_members: number;
  total_tasks: number;
  board_users_roles: BoardUserRole[];
}

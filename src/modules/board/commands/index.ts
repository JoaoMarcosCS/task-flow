import { AddMemberBoardHandler } from './add-member-board/add-member-board.handler';
import { CreateBoardHandler } from './create-board/create-board.handler';
import { DeleteBoardHandler } from './delete-board/delete-board.handler';
import { DeleteMemberBoardHandler } from './delete-member-board/delete-member-board.handler';
import { UpdateBoardHandler } from './update-board/update-board.handler';
import { UpdateMemberRoleHandler } from './update-member-role-board/update-member-roleboard.handler';

export const commandHandlers = [
  CreateBoardHandler,
  UpdateBoardHandler,
  DeleteBoardHandler,
  AddMemberBoardHandler,
  DeleteBoardHandler,
  UpdateMemberRoleHandler,
  DeleteMemberBoardHandler,
];

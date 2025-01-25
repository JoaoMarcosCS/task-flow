import { GetBoardByUserIdHandler } from './get-board-by-user-id/get-board-by-user-id.handler';
import { GetBoardsByUserIdHandler } from './get-boards-by-user-id/get-boards-by-user-id.handler';

export const queryHandlers = [
  GetBoardsByUserIdHandler,
  GetBoardByUserIdHandler,
];

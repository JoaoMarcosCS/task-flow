export class GetBoardsByUserIdDto {
  id: number;
  created_at: Date;
  updated_at: Date;
  total_members: number;
  total_tasks: number;
  title: string;
  description?: string;
}

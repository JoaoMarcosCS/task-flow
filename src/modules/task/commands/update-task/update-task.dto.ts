export class UpdateTaskDto {
  title?: string;
  description?: string;
  priorityId?: number;
  statusId?: number;
  boardId: number;
}

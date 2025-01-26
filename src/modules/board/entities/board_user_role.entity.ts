import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('board_user_role')
export class BoardUserRole {
  @PrimaryColumn({ type: 'int' })
  userId: number;

  @PrimaryColumn({ type: 'int' })
  boardId: number;

  @ManyToOne(() => Role, { onDelete: 'SET NULL' })
  role: Role;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('board_user_role')
export class BoardUserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  boardId: number;

  @ManyToOne(() => Role, { onDelete: 'SET NULL' })
  role: Role;
}

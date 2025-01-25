import { BaseEntity } from 'src/modules/shared/base-entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Priority } from './priority.entity';
import { Status } from './status.entity';
import { Board } from 'src/modules/board/entities/board.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('task')
export class Task extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Priority, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  priority: Priority;

  @ManyToOne(() => Status, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  status: Status;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToMany(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  assignees: User[];
}

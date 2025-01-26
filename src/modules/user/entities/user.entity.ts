import { Board } from 'src/modules/board/entities/board.entity';
import { BaseEntity } from 'src/modules/shared/base-entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Board, (board) => board.members, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  boards: Board[];

  @ManyToMany(() => Task, (task) => task.assignees, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  tasks: Task[];
}

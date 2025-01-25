import { BaseEntity } from 'src/modules/shared/base-entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('board')
export class Board extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  @JoinTable()
  members: User[];

  @OneToMany(() => Task, (task) => task.board, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinTable()
  tasks?: Task[];
}

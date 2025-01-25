import { BaseEntity } from 'src/modules/shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('role')
export class Role extends BaseEntity {
  @Column({ type: 'text' })
  description: string;
}

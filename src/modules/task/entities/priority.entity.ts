import { BaseEntity } from 'src/modules/shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('priority')
export class Priority extends BaseEntity {
  @Column({ type: 'text' })
  description: string;
}

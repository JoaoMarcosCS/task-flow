import { BaseEntity } from 'src/modules/shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('status')
export class Status extends BaseEntity {
  @Column({ type: 'text', unique: true })
  description: string;
}

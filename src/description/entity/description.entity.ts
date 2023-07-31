import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Descriptions extends BaseEntity {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'text' })
  description: string;
}

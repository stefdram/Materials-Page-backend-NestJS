import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Materials extends BaseEntity {
  @Column({ type: 'integer' })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer' })
  user_nik: number;

  @PrimaryColumn({ type: 'timestamp without time zone' })
  date_added: string;
}

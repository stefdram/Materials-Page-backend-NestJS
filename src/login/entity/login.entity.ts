import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @Column({ primary: true, type: 'integer' })
  nik: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  password: string;
}

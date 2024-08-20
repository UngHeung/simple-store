import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['useraccount'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  useraccount: string;
  @Column()
  password: string;
  @Column()
  role: string;

  @Column()
  username: string;
  @Column()
  phone: string;
  @Column()
  address: string;
}

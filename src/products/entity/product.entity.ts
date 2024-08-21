import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['modelname'])
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelname: string;
  @Column()
  petname: string;
  @Column()
  memory: string;
  @Column()
  colors: string;

  // manufacturer
}

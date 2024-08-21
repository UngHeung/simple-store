import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['manufacturerName'])
export class ManufacturerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  manufacturerName: string;

  // product
}

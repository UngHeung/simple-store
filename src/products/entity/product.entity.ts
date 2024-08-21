import { ManufacturerEntity } from 'src/manufacturer/entity/manufacturer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
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

  @ManyToOne(
    () => ManufacturerEntity,
    (manufacturer) => manufacturer.products,
    { eager: false },
  )
  manufacturer: ManufacturerEntity;
}

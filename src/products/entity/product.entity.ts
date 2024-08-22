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
@Unique(['modelName'])
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string;
  @Column()
  petName: string;
  @Column()
  colors: string;

  @ManyToOne(() => ManufacturerEntity, manufacturer => manufacturer.products, {
    eager: false,
  })
  manufacturer: ManufacturerEntity;
}

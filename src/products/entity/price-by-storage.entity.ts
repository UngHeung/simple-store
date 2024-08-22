import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class PriceByStorageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storage: number;
  @Column()
  price: number;

  // product
  @ManyToOne(() => ProductEntity, product => product.priceByStorages, {
    eager: false,
  })
  product: ProductEntity;
}

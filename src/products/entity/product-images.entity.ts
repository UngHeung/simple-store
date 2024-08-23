import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
@Unique(['modelName'])
export class ProductImagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  modelName: string;
  @Column()
  imagesPath: string;

  @OneToOne(() => ProductEntity, products => products.imagesPath, {
    eager: false,
  })
  product: ProductEntity;
}

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
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

  @OneToMany(() => ProductEntity, products => products.imagesPath, {
    eager: true,
  })
  products: ProductEntity[];
}

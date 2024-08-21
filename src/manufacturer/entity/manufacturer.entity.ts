import { ProductEntity } from 'src/products/entity/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
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

  @OneToMany(() => ProductEntity, (product) => product.manufacturer, {
    eager: true,
  })
  products: ProductEntity[];
}

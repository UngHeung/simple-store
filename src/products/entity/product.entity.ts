import { ManufacturerEntity } from 'src/manufacturer/entity/manufacturer.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PriceByStorageEntity } from './price-by-storage.entity';
import { ProductImagesEntity } from './product-images.entity';

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

  @OneToMany(() => PriceByStorageEntity, priceByStorage => priceByStorage.product, { eager: true })
  priceByStorages: PriceByStorageEntity[];

  @OneToOne(() => ProductImagesEntity)
  @JoinColumn()
  productImages: ProductImagesEntity;
}

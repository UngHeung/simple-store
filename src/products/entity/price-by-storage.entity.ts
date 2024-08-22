import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PriceByStorageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storage: number;
  @Column()
  price: number;

  // product
}

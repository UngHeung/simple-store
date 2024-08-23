import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductImagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  imagesPath: string;
}

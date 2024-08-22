import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PriceByStorageEntity } from './entity/price-by-storage.entity';
import { ManufacturerEntity } from 'src/manufacturer/entity/manufacturer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      PriceByStorageEntity,
      ManufacturerEntity,
    ]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

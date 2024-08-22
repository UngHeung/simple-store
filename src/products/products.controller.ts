import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductsService } from './products.service';
import { AddPriceByStorageDto } from './dto/add-price-by-starage.dto';
import { PriceByStorageEntity } from './entity/price-by-storage.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Products

  @Post('/')
  createProduct(
    @Body(ValidationPipe) addProductDto: AddProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.createProduct(addProductDto);
  }

  // Price by Storage

  @Post('/price')
  createPriceByStorage(
    @Body(ValidationPipe) addPriceByStorage: AddPriceByStorageDto,
  ): Promise<PriceByStorageEntity> {
    return this.productsService.createPriceByStorage(addPriceByStorage);
  }
}

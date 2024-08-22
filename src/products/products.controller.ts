import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
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

  @Get('/')
  getProducts(): Promise<ProductEntity[]> {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return this.productsService.getProductById(id);
  }

  // Price by Storage
  @Post('/price')
  createPriceByStorage(
    @Body(ValidationPipe) addPriceByStorage: AddPriceByStorageDto,
  ): Promise<PriceByStorageEntity> {
    return this.productsService.createPriceByStorage(addPriceByStorage);
  }

  @Get('/price')
  getPriceByStorages(): Promise<PriceByStorageEntity[]> {
    return this.productsService.getPriceByStorages();
  }
}

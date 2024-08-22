import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductsService } from './products.service';
import { AddPriceByStorageDto } from './dto/add-price-by-starage.dto';
import { PriceByStorageEntity } from './entity/price-by-storage.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Post('/:id/upload-images')
  @UseInterceptors(FilesInterceptor('images'))
  addProductImages(
    @Param('id', ParseIntPipe) productId: number,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.productsService.addProductImages(productId, images);
  }

  @Put('/')
  updateProduct(
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.updateProduct(updateProductDto);
  }

  @Patch('/:id/manufacturer')
  updateProductManufacturer(
    @Param('id', ParseIntPipe) productId: number,
    @Body(ValidationPipe) req: { manufacturerId: number },
  ): Promise<ProductEntity> {
    return this.productsService.updateProductManufacturer(
      productId,
      req.manufacturerId,
    );
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
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

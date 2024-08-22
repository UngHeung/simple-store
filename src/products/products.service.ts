import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { PriceByStorageEntity } from './entity/price-by-storage.entity';
import { AddProductDto } from './dto/add-product.dto';
import { AddPriceByStorageDto } from './dto/add-price-by-starage.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(PriceByStorageEntity)
    private priceByStorageRepository: Repository<PriceByStorageEntity>,
  ) {}

  /**
   * product 추가, 불러오기, 수정, 삭제
   * price by storage 추가, 불러오기, 수정 삭제
   */

  // Product
  async createProduct(addProductDto: AddProductDto): Promise<ProductEntity> {
    const { modelName, petName, colors }: AddProductDto = addProductDto;
    const product = this.productRepository.create({
      modelName,
      petName,
      colors,
    });

    try {
      const response = await this.productRepository.save(product);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return product;
  }

  // Price by Storage

  async createPriceByStorage(
    addPriceByStorageDto: AddPriceByStorageDto,
  ): Promise<PriceByStorageEntity> {
    const { storage, price }: AddPriceByStorageDto = addPriceByStorageDto;

    const product = await this.productRepository.findOne({
      where: { id: addPriceByStorageDto.productId },
    });

    console.log(product);

    const priceByStorage = this.priceByStorageRepository.create({
      storage,
      price,
      product,
    });

    product.priceByStorages.push(priceByStorage);

    try {
      const response = await this.priceByStorageRepository.save(priceByStorage);
      const response2 = await this.productRepository.save(product);
      console.log(response, response2);
    } catch (error) {
      console.log(error);
    }

    return priceByStorage;
  }
}

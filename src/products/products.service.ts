import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { PriceByStorageEntity } from './entity/price-by-storage.entity';
import { AddProductDto } from './dto/add-product.dto';
import { AddPriceByStorageDto } from './dto/add-price-by-starage.dto';
import { ManufacturerEntity } from 'src/manufacturer/entity/manufacturer.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImagesEntity } from './entity/product-images.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(PriceByStorageEntity)
    private priceByStorageRepository: Repository<PriceByStorageEntity>,
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
    @InjectRepository(ProductImagesEntity)
    private productImagesRepository: Repository<ProductImagesEntity>,
  ) {}

  /**
   * product 추가, 불러오기, 수정, 삭제
   * price by storage 추가, 불러오기, 수정 삭제
   */

  // Product
  async createProduct(addProductDto: AddProductDto): Promise<ProductEntity> {
    const { modelName, petName, colors, manufacturerId }: AddProductDto =
      addProductDto;
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: manufacturerId },
    });
    const product = this.productRepository.create({
      modelName,
      petName,
      colors,
      manufacturer,
    });

    try {
      const response = await this.productRepository.save(product);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return product;
  }

  async getProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async getProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`상품이 존재하지 않습니다. id : ${id}`);
    return product;
  }

  async addProductImages(images: Array<Express.Multer.File>) {
    const paths: string[] = [];
    images.map(item => paths.push(item.path));
    const imagesPath = this.productImagesRepository.create({
      imagesPath: paths.join(', '),
    });

    this.productImagesRepository.save(imagesPath);

    return imagesPath;
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const { modelName, petName, colors, productImagesId } = updateProductDto;

    const product = await this.getProductById(updateProductDto.productId);
    const productImages = await this.productImagesRepository.findOneBy({
      id: productImagesId,
    });

    modelName && (product.modelName = modelName);
    petName && (product.petName = petName);
    colors && (product.colors = colors);
    productImages && (product.productImages = productImages);

    const response = await this.productRepository.save(product);
    Logger.log(`>>>>> 업데이트 완료. 내용 : ${JSON.stringify(response)}`);

    return product;
  }

  async updateProductManufacturer(
    productId: number,
    manufacturerId: number,
  ): Promise<ProductEntity> {
    const product = await this.getProductById(productId);
    const manufacturer = await this.manufacturerRepository.findOneBy({
      id: manufacturerId,
    });
    product.manufacturer = manufacturer;
    this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    this.productRepository.delete({ id });
  }

  // Price by Storage
  async createPriceByStorage(
    addPriceByStorageDto: AddPriceByStorageDto,
  ): Promise<PriceByStorageEntity> {
    const { storage, price }: AddPriceByStorageDto = addPriceByStorageDto;

    const product = await this.productRepository.findOne({
      where: { id: addPriceByStorageDto.productId },
    });

    const priceByStorage = this.priceByStorageRepository.create({
      storage,
      price,
      product,
    });

    try {
      const response = await this.priceByStorageRepository.save(priceByStorage);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    return priceByStorage;
  }

  async getPriceByStorages(): Promise<PriceByStorageEntity[]> {
    const priceByStorage = await this.priceByStorageRepository.find();
    return priceByStorage;
  }
}

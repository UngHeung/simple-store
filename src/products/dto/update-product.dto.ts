import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;
  @IsString()
  modelName: string;
  @IsString()
  petName: string;
  @IsString()
  colors: string;
  @IsNumber()
  productImagesId: number;
}

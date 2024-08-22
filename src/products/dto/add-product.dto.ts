import { IsNotEmpty, IsString } from 'class-validator';

export class addProductDto {
  @IsString()
  @IsNotEmpty()
  modelName: string;
  @IsString()
  @IsNotEmpty()
  petName: string;
  @IsString()
  colors: string;

  // price by memory
}

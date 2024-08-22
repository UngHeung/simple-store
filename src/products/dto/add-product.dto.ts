import { IsNotEmpty, IsString } from 'class-validator';

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  modelName: string;
  @IsString()
  @IsNotEmpty()
  petName: string;
  @IsString()
  colors: string;
}

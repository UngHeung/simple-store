import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddPriceByStorageDto {
  @IsNumber()
  @IsNotEmpty()
  storage: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}

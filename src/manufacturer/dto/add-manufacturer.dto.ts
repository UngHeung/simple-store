import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class AddManufacturerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @Matches(/^[가-힣_]*$/, {
    message: '제조사명은 한글, 언더바(_)만 입력 가능합니다. (최대 10자)',
  })
  manufacturerName: string;
}

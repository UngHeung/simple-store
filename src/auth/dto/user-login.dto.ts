import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  useraccount: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  useraccount: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

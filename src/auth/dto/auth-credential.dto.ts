import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/^[a-z0-9]*$/, {
    message: '아이디는 영문 소문자, 숫자만 입력할 수 있습니다.',
  })
  useraccount: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,}$/, {
    message:
      '비밀번호는 영문 대소문자, 숫자, 특수문자가 포함되어야 합니다. (!@#$%^*+=-)',
  })
  password: string;
}

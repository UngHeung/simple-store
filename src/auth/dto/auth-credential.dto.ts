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
  @Matches(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, {
    message:
      '비밀번호는 영문 대소문자, 숫자, 특수문자가 포함되어야 합니다. (!@#$%^*+=-)',
  })
  password: string;

  @IsString()
  @MaxLength(10)
  @Matches(/^[가-힣]*$/, { message: '이름은 한글만 입력 가능합니다.' })
  username: string;

  @IsString()
  @MinLength(12)
  @MaxLength(13)
  @Matches(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: '핸드폰 번호는 숫자만 입력 가능합니다.',
  })
  phone: string;

  @IsString()
  @MaxLength(30)
  @Matches(/^[가-힣a-zA-Z0-9 -]*$/, {
    message: '주소는 한글, 영문, 숫자만 입력 가능합니다.',
  })
  address?: string;
}

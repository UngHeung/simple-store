import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  @Matches(/^[a-z0-9]*$/, {
    message: '아이디는 영문 소문자, 숫자만 입력할 수 있습니다. (5 ~ 10자 제한)',
  })
  useraccount: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, {
    message:
      '비밀번호는 영문 대소문자, 숫자, 특수문자가 포함되어야 합니다. (!@#$%^*+=-) (8 ~ 15자 제한)',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @Matches(/^[가-힣]*$/, {
    message: '이름은 한글만 입력 가능합니다. (최대 10자)',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(13)
  @Matches(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: '핸드폰 번호는 숫자만 입력 가능합니다. (3 - 3 - 4 / 3 - 4 - 4)',
  })
  phone: string;

  @IsString()
  @MaxLength(30)
  @Matches(/^[가-힣a-zA-Z0-9 -]*$/, {
    message:
      '주소는 한글, 영문, 숫자, 공백, 하이픈(-)만 입력 가능합니다. (최대 30자)',
  })
  address?: string;
}

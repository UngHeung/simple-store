import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.createUser(authCredentialDto);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) userLoginDto: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(userLoginDto);
  }
}

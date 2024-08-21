import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { useraccount, password } = authCredentialDto;
    const user = this.userRepository.create({
      useraccount,
      password: await this.encodePassword(password),
      role: 'ROLE_USER',
      username: authCredentialDto.username,
      phone: authCredentialDto.phone,
      address: authCredentialDto.address,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(
          '이미 등록된 계정(아이디 또는 연락처)입니다.',
        );
      else throw new InternalServerErrorException();
    }
  }

  async login(userLoginDto: UserLoginDto): Promise<{ accessToken: string }> {
    const { useraccount, password } = userLoginDto;
    const user = this.userRepository.findOneBy({ useraccount });

    if (user && (await bcrypt.compare(password, (await user).password))) {
      const payload = { useraccount };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
  }

  async encodePassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { useraccount, password } = authCredentialDto;
    const user = this.userRepository.create({
      useraccount,
      password,
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
}

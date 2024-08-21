import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as config from 'config';

const jwtConfig: any = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { useraccount: string }) {
    const { useraccount } = payload;
    const user: UserEntity = await this.userRepository.findOneBy({
      useraccount,
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}

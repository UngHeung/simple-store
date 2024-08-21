import { Module } from '@nestjs/common';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerEntity } from './entity/manufacturer.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity]), AuthModule],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
})
export class ManufacturerModule {}

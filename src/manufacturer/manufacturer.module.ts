import { Module } from '@nestjs/common';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService]
})
export class ManufacturerModule {}

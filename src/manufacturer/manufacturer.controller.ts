import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { AddManufacturerDto } from './dto/add-manufacturer.dto';
import { ManufacturerEntity } from './entity/manufacturer.entity';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Post('/add')
  @UsePipes(ValidationPipe)
  createManufacturer(
    @Body() addManufacturerDto: AddManufacturerDto,
  ): Promise<void> {
    return this.manufacturerService.createManufacturer(addManufacturerDto);
  }

  @Get('/')
  getManufacturers(): Promise<ManufacturerEntity[]> {
    return this.manufacturerService.getManufacturers();
  }

  @Get('/find')
  getManufacturerByName(
    @Body() req: { manufacturerName: string },
  ): Promise<ManufacturerEntity> {
    return this.manufacturerService.getManufacturerByName(req.manufacturerName);
  }
}

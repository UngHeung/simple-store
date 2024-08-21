import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { AddManufacturerDto } from './dto/add-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Post('/add')
  @UsePipes(ValidationPipe)
  createManufacturer(@Body() addManufacturerDto: AddManufacturerDto) {
    return this.manufacturerService.createManufacturer(addManufacturerDto);
  }
}

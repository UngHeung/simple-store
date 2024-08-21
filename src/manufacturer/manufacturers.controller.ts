import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { AddManufacturerDto } from './dto/add-manufacturer.dto';
import { ManufacturerEntity } from './entity/manufacturer.entity';

@Controller('manufacturer')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}

  @Post('/add')
  @UsePipes(ValidationPipe)
  createManufacturer(
    @Body() addManufacturerDto: AddManufacturerDto,
  ): Promise<void> {
    return this.manufacturersService.createManufacturer(addManufacturerDto);
  }

  @Get('/')
  getManufacturers(): Promise<ManufacturerEntity[]> {
    return this.manufacturersService.getManufacturers();
  }

  @Get('/find')
  getManufacturerByName(
    @Body() req: { manufacturerName: string },
  ): Promise<ManufacturerEntity> {
    return this.manufacturersService.getManufacturerByName(
      req.manufacturerName,
    );
  }

  @Delete('/:id')
  deleteManufacturer(@Param('id', ParseIntPipe) id: number) {
    return this.manufacturersService.deleteManufacturer(id);
  }
}

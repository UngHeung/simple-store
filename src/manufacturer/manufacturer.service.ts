import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerEntity } from './entity/manufacturer.entity';
import { Repository } from 'typeorm';
import { AddManufacturerDto } from './dto/add-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  @InjectRepository(ManufacturerEntity)
  private manufacturerRepository: Repository<ManufacturerEntity>;

  async addManufacturer(addManufacturerDto: AddManufacturerDto): Promise<void> {
    const { manufacturerName } = addManufacturerDto;
    const manufacturer = this.manufacturerRepository.create({
      manufacturerName,
    });

    try {
      await this.manufacturerRepository.save(manufacturer);
    } catch (error) {
      console.log(error);
    }
  }
}

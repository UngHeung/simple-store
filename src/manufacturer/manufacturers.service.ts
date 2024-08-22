import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerEntity } from './entity/manufacturer.entity';
import { Repository } from 'typeorm';
import { AddManufacturerDto } from './dto/add-manufacturer.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async createManufacturer(
    addManufacturerDto: AddManufacturerDto,
  ): Promise<ManufacturerEntity> {
    const { manufacturerName } = addManufacturerDto;
    const manufacturer = this.manufacturerRepository.create({
      manufacturerName,
    });

    try {
      await this.manufacturerRepository.save(manufacturer);
    } catch (error) {
      console.log(error);
    }

    return manufacturer;
  }

  async getManufacturers(): Promise<ManufacturerEntity[]> {
    const manufacturers = await this.manufacturerRepository.find();
    return manufacturers;
  }

  async getManufacturerByName(
    manufacturerName: string,
  ): Promise<ManufacturerEntity> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { manufacturerName: manufacturerName },
    });

    if (!manufacturer)
      throw new NotFoundException(
        `제조사를 찾을 수 없습니다. 검색어 : ${manufacturerName}`,
      );

    return manufacturer;
  }

  async deleteManufacturer(id: number): Promise<void> {
    const response = await this.manufacturerRepository.delete({ id });
    if (!response.affected)
      throw new NotFoundException(`삭제할 제조사가 없습니다. id: ${id}`);
  }
}

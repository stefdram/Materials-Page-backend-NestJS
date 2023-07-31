import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Descriptions } from './entity/description.entity';
import { Repository } from 'typeorm';
import { CreateEditDescriptionDto } from './dto/edit-create.dto';
import { Response } from 'express';

@Injectable()
export class DescriptionService {
  constructor(
    @InjectRepository(Descriptions)
    private readonly descriptionRepository: Repository<Descriptions>,
  ) {}

  async getAllDescriptions(): Promise<Descriptions[]> {
    return await this.descriptionRepository.find();
  }

  async getDescriptionById(id: number): Promise<Descriptions> {
    return (await this.descriptionRepository.findOneBy({ id: id }));
  }

  async createOrEditDescription(
    createEditDescriptionDto: CreateEditDescriptionDto,
    res: Response,
  ): Promise<Response> {
    const id = createEditDescriptionDto.id;
    const description = createEditDescriptionDto.description;
    const existingDesc = await this.getDescriptionById(id);
    if (!existingDesc) {
      // Create new description element
      const data = new Descriptions();
      data.id = id;
      data.description = description;
      try {
        await data.save();
        return res
          .status(200)
          .json({ message: 'Description created', data: { id, description } });
      } catch (e) {
        // Error caught
        throw new InternalServerErrorException(e);
      }
    } else {
      if (description === existingDesc.description) {
        return res.status(400).json({
          message: 'Description not changed',
          data: { id, description },
        });
      }
    }
    // Update existing description to a new one
    existingDesc.description = description;
    try {
      await existingDesc.save();
      return res
        .status(200)
        .json({ message: 'Description updated', data: { id, description } });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteDescriptionById(id: number, res: Response): Promise<Response> {
    const existingDesc = await this.getDescriptionById(id);
    if (!existingDesc) {
      return res.status(400).json('Description unavailable, nothing to erase');
    }
    await existingDesc.remove();
    return res.status(200).json(`Description with id: ${id} is erased`);
  }
}

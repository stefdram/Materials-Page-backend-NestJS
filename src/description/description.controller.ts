import {
  Controller,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Body,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DescriptionService } from './description.service';
import { Descriptions } from './entity/description.entity';
import { CreateEditDescriptionDto } from './dto/edit-create.dto';
import { Response } from 'express';

@Controller('materials')
@UseGuards(AuthGuard('jwt'))
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Get('get/all-descriptions')
  async getAllDescriptions(): Promise<Descriptions[]> {
    return this.descriptionService.getAllDescriptions();
  }

  @Get('get/description/:id')
  async getDescriptionById(@Param('id') id: number): Promise<string> {
    const desc = (await this.descriptionService.getDescriptionById(id)).description;
    return JSON.stringify(desc);
  }

  @Put('edit/description')
  async createOrEditDescription(
    @Body() payload: CreateEditDescriptionDto,
    @Res() res: Response,
  ): Promise<Response> {
    return this.descriptionService.createOrEditDescription(payload, res);
  }

  @Delete('delete/description/:id')
  async deleteDescriptionById(@Param('id') id: number, @Res() res: Response) {
    return this.descriptionService.deleteDescriptionById(id, res);
  }
}

import {
  Controller,
  UseGuards,
  Get,
  Body,
  Param,
  Post,
  Res,
  Put,
  Delete,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { Materials } from './entity/material.entity';
import { UniqueMaterialDto } from './dto/get-unique.dto';
import { AddMaterialDto } from './dto/add-material.dto';
import { Response } from 'express';
import { EditMaterialDto } from './dto/edit-material.dto';
import { DeleteMaterialDto } from './dto/delete-material.dto';

@Controller('materials')
@UseGuards(AuthGuard('jwt'))
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async getAllMaterials(): Promise<Materials[]> {
    return this.materialService.getAllMaterials();
  }

  @Get(':id')
  async getMaterialsById(@Param('id') id: number): Promise<Materials[]> {
    return this.materialService.getMaterialsById(id);
  }

  @Get('by/:name')
  async getMaterialsByName(@Param('name') name: string): Promise<Materials[]> {
    return this.materialService.getMaterialsByName(name);
  }

  @Get('get/ids')
  async getAllIds(): Promise<number[]> {
    return this.materialService.getAllIds();
  }

  @Get('get/id-name')
  async getMaterialByIdAndName(
    @Body() payload: UniqueMaterialDto,
  ): Promise<Materials> {
    return this.materialService.getMaterialByIdAndName(payload);
  }

  @Post('add')
  async addMaterial(
    @Body() payload: AddMaterialDto,
    @Res() res: Response,
  ): Promise<Response> {
    return this.materialService.addMaterial(payload, res);
  }

  @Put('edit/:id/:name')
  async updateMaterial(
    @Body() payload: EditMaterialDto,
    @Param('id') id: number,
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<Response> {
    return this.materialService.updateMaterial(payload, id, name, res);
  }

  @Delete('deletelist/:id')
  async deleteMaterialsById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    return this.materialService.deleteMaterialsById(id, res);
  }

  @Delete('deleteone')
  async deleteOneMaterial(
    @Body() payload: DeleteMaterialDto,
    @Res() res: Response,
  ): Promise<Response> {
    return this.materialService.deleteOneMaterial(payload, res);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Materials } from './entity/material.entity';
import { Repository } from 'typeorm';
import { UniqueMaterialDto } from './dto/get-unique.dto';
import { AddMaterialDto } from './dto/add-material.dto';
import { Response } from 'express';
import { setCurrentJakartaTime } from './helper/jakarta-time.setter';
import { createNewMaterial } from './helper/create-material';
import { EditMaterialDto } from './dto/edit-material.dto';
import { DeleteMaterialDto } from './dto/delete-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Materials)
    private readonly materialRepository: Repository<Materials>,
  ) {}

  async getAllMaterials(): Promise<Materials[]> {
    // edit the date_added format
    const allMaterials = await this.materialRepository
      .createQueryBuilder()
      .select([
        'id',
        'name',
        'user_nik',
        "TO_CHAR(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added",
      ])
      .getRawMany();

    return allMaterials;
  }

  async getMaterialsById(id: number): Promise<Materials[]> {
    const allMaterialsById = await this.materialRepository
      .createQueryBuilder()
      .select([
        'id',
        'name',
        'user_nik',
        "TO_CHAR(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added",
      ])
      .where('id = :id', { id })
      .getRawMany();

    return allMaterialsById;
  }

  async getMaterialsByName(name: string): Promise<Materials[]> {
    const allMaterialsByName = await this.materialRepository
      .createQueryBuilder()
      .select([
        'id',
        'name',
        'user_nik',
        "TO_CHAR(date_added, 'YYYY-MM-DD HH24:MI:SS.MS') AS date_added",
      ])
      .where('name = :name', { name })
      .getRawMany();

    return allMaterialsByName;
  }

  async getAllIds(): Promise<number[]> {
    const allIds = await this.materialRepository
      .createQueryBuilder()
      .select(['DISTINCT id', 'MIN(date_added) AS date_added'])
      .groupBy('id')
      .getRawMany();

    const sortedRows = allIds.sort((a, b) => {
      const dateA = new Date(a.date_added);
      const dateB = new Date(b.date_added);

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

    return sortedRows.map((row) => row.id);
  }

  async getMaterialByIdAndName(
    uniqueMaterialDto: UniqueMaterialDto,
  ): Promise<Materials> {
    const id = uniqueMaterialDto.id;
    const name = uniqueMaterialDto.name;
    const uniqueMaterial: Materials = await this.materialRepository.findOne({
      where: { id, name },
    });

    return uniqueMaterial;
  }

  async addMaterial(
    addMaterialDto: AddMaterialDto,
    res: Response,
  ): Promise<Response> {
    const id = addMaterialDto.id;
    const name = addMaterialDto.name;
    const user_nik = addMaterialDto.user_nik;
    const date_added = setCurrentJakartaTime();
    let check: UniqueMaterialDto = new UniqueMaterialDto();
    check.id = id;
    check.name = name.trim();
    const existingMaterial = await this.getMaterialByIdAndName(check);
    if (existingMaterial) {
      return res.status(400).send('Material already exists!');
    }
    const trimmedName = name.trim();
    return createNewMaterial(id, trimmedName, user_nik, date_added, res);
  }

  async updateMaterial(
    editMaterialDto: EditMaterialDto,
    id: number,
    currentName: string,
    res: Response,
  ): Promise<Response> {
    let check: UniqueMaterialDto = new UniqueMaterialDto();
    check.id = id;
    check.name = currentName;
    const existingMaterial: Materials = await this.getMaterialByIdAndName(
      check,
    );
    if (!existingMaterial) {
      return res.status(409).send('Material unavailable');
    }
    const newName = editMaterialDto.name.trim();
    existingMaterial.name = newName;
    try {
      await existingMaterial.save();
      return res.json({
        message: 'Material updated successfully',
        body: { material: { id, newName } },
      });
    } catch (e) {
      throw new InternalServerErrorException('message: ' + e);
    }
  }

  async deleteMaterialsById(id: number, res: Response): Promise<Response> {
    const existingMaterials: Materials[] = await this.getMaterialsById(id);
    if (existingMaterials.length == 0) {
      return res.status(409).send('Material unavailable');
    }
    await this.materialRepository.remove(existingMaterials);
    return res.json({
      message: 'Material List deleted successfully',
      body: { material: { id } },
    });
  }
  
  async deleteOneMaterial(deleteMaterialDto: DeleteMaterialDto, res: Response): Promise<Response> {
    const id = deleteMaterialDto.id;
    const name = deleteMaterialDto.name.trim();
    let check: UniqueMaterialDto = new UniqueMaterialDto();
    check.id = id;
    check.name = name;
    const existingMaterial = await this.getMaterialByIdAndName(check);
    if (!existingMaterial) {
      return res.status(409).send("Material unavailable");
    }
    await existingMaterial.remove();
    return res.json({
      message: "Material deleted successfully",
      body: { material: { id, name } },
    });
  }
}
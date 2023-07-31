import { Materials } from '../entity/material.entity';
import { Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

export const createNewMaterial = async (
  id: number,
  name: string,
  user_nik: number,
  date_added: string,
  res: Response,
): Promise<Response> => {
  const data = new Materials();
  data.id = id;
  data.name = name;
  data.user_nik = user_nik;
  data.date_added = date_added;
  try {
    await data.save();
    return res.status(200).json({
      message: 'Material added successfully',
      body: { material: { id, name, user_nik, date_added } },
    });
  } catch (e) {
    throw new InternalServerErrorException(e);
  }
};

import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class AddMaterialDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsInt()
  @Type(() => Number)
  @Min(1000000)
  @Max(99999999)
  user_nik: number;
}

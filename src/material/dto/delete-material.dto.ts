import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteMaterialDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  name: string;
}

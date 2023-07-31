import { IsNotEmpty } from 'class-validator';

export class EditMaterialDto {
  @IsNotEmpty()
  name: string;
}

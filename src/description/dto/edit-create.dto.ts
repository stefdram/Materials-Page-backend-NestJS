import { IsInt, IsNotEmpty} from 'class-validator';

export class CreateEditDescriptionDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  description: string;
}
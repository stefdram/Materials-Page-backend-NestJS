import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min, Max, Length} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Type(() => Number)
  @Min(1000000)
  @Max(99999999)
  nik: number;

  @IsNotEmpty()
  @Length(3, 255, { message: 'Password must be at least 3 characters long' })
  password: string;
}

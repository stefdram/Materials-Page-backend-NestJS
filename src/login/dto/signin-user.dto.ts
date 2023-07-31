import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class SignInUserDto {
  @IsInt()
  @Type(() => Number)
  @Min(1000000)
  @Max(99999999)
  nik: number;

  @IsNotEmpty()
  password: string;
}

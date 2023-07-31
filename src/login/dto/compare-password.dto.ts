import { IsNotEmpty } from 'class-validator';

export class ComparePasswordDto {
  @IsNotEmpty()
  userPassword: string;

  @IsNotEmpty()
  inputPassword: string;
}

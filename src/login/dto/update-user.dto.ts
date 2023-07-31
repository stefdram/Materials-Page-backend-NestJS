import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(3, 255, { message: 'Password must be at least 3 characters long' })
  password: string;
}

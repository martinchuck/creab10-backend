import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 25)
  password: string;
}

import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @Length(5, 25)
  oldPassword: string;

  @IsNotEmpty()
  @Length(5, 25)
  newPassword: string;
}

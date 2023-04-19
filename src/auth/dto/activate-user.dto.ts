import { IsNotEmpty, IsUUID } from 'class-validator';

export class ActivateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsUUID('4')
  code: string;
}

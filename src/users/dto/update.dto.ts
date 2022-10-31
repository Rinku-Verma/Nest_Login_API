import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

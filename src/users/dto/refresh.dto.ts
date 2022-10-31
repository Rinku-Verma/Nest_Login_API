import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshDTO {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
